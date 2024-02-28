import { resolve } from 'node:path'
import { markdownTable } from 'markdown-table'
import { getExportsSize } from 'export-size'
import { filesize } from 'filesize'
import fs from 'fs-extra'
import { version } from '../package.json'
import { rootDir } from './const'

const packagesRoot = resolve(rootDir, 'packages')

const meta = [
  {
    name: 'core',
  },
]

async function resolvePkgJson(pkgName: string, isGen = true) {
  if (!isGen) {
    await fs.remove(resolve(packagesRoot, pkgName, 'dist/package.json'))
    return
  }
  const packageJSON = await fs.readJSON(resolve(packagesRoot, pkgName, 'package.json'))
  packageJSON.module = './index.mjs'
  await fs.writeJSON(resolve(packagesRoot, pkgName, 'dist/package.json'), packageJSON, 'utf-8')
}

async function run() {
  for (const pkg of meta)
    await resolvePkgJson(pkg.name)

  let md = '# Export size\n\n'
  const mdJSON = <{ [name: string]: string }>{}
  md += `version: ${version}<br>\n`
  md += `date: ${new Date().toISOString()}\n\n`

  md += '> Please note this is bundle size for each individual APIs (excluding Vue). '
  md += 'Since we have a lot shared utilities underneath each function, importing two '
  md += 'different functions does NOT necessarily mean the bundle size will be the sum of them (usually smaller). '
  md += 'Depends on the bundler and minifier you use, the final result might vary, this list is for reference only.'
  md += '\n\n'

  for (const pkg of meta) {
    const { exports, packageJSON } = await getExportsSize({
      pkg: `./packages/${pkg.name}/dist`,
      output: false,
      bundler: 'rollup',
    })

    md += `<kbd>${packageJSON.name}</kbd>\n\n`

    md += markdownTable([
      ['Function', 'min+gzipped'],
      ...exports.map((i) => {
        mdJSON[i.name] = filesize(i.minzipped)
        return [`\`${i.name}\``, filesize(i.minzipped)]
      }),
    ])

    md += '\n\n'
  }

  md = md.replace(/\r\n/g, '\n')

  // await fs.remove(join(packagesRoot, 'shared/index.mjs'))
  for (const pkg of meta)
    await resolvePkgJson(pkg.name, false)

  await fs.writeFile('packages/export-size.md', md, 'utf-8')
  await fs.writeJSON('packages/export-size.json', mdJSON, { spaces: 2 })
}

run()
