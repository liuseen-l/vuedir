import { resolve } from 'node:path'
import type { OutputOptions, RollupOptions } from 'rollup'
import fg from 'fast-glob'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { rootDir } from './scripts/const'

const configs: RollupOptions[] = []
const packages: string[] = []

packages.push(
  ...fg
    .sync('*', {
      cwd: resolve(`${rootDir}/packages`),
      onlyDirectories: true,
      ignore: ['shared'],
    }),
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
      { file: resolve(rootDir, `packages/${pkgName}/dist/index.d.ts`) },
      {
        file: resolve(rootDir, `packages/${pkgName}/dist/index.d.cts`),
      },
    ],
    plugins: [dts()],
  })
}

export default configs
