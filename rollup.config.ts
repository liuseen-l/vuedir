import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { OutputOptions, RollupOptions } from 'rollup'
import fg from 'fast-glob'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const configs: RollupOptions[] = []
const packages: string[] = []
const rootDir = __dirname

packages.push(
  ...fg
    .sync('*', {
      cwd: resolve(`${rootDir}/packages`),
      onlyDirectories: true,
      ignore: ['shared']
    })
)

for (const pkgName of packages) {
  const input = resolve(rootDir, `packages/${pkgName}/index.ts`)
  const output: OutputOptions[] = []

  output.push({
    file: resolve(rootDir, `packages/${pkgName}/dist/index.mjs`),
    format: 'es',
  })

  output.push({
    file: resolve(rootDir, `packages/${pkgName}/dist/index.cjs`),
    format: 'cjs',
  })

  configs.push({
    input,
    output,
    plugins: [esbuild()],
  })

  configs.push({
    input,
    output: [
      { file: resolve(rootDir, `packages/${pkgName}/dist/index.d.ts`), },
      {
        file: resolve(rootDir, `packages/${pkgName}/dist/index.d.cts`),
      }
    ],
    plugins: [dts()],
  })
}


export default configs