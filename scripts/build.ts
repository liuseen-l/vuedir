import { join, resolve } from 'node:path'
import { execSync as exec } from 'node:child_process'
import fs from 'fs-extra'
import { packages } from '../meta/packages'
import { version } from '../package.json'
import { rootDir } from './const'

const watch = process.argv.includes('--watch')

async function buildMetaFiles() {
  for (const { name } of packages) {
    const packageRoot = resolve(rootDir, 'packages', name)
    const packageDist = resolve(packageRoot, 'dist')

    const packageJSON = fs.readJSONSync(join(packageRoot, 'package.json'))
    for (const key of Object.keys(packageJSON.dependencies || {})) {
      if (key.startsWith('@vuedir/'))
        packageJSON.dependencies[key] = version
    }

    fs.writeJsonSync(join(packageDist, 'package.json'), packageJSON, { spaces: 2 })
  }
}
async function build() {
  exec('pnpm run clean', { stdio: 'inherit' })

  exec(`pnpm run build:rollup${watch ? '--watch' : ''}`, { stdio: 'inherit' })

  await buildMetaFiles()
}

build()
