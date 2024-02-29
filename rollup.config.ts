import { resolve } from 'node:path'
import type { OutputOptions, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { rootDir } from './scripts/const'
import { packages } from './meta/packages'

const configs: RollupOptions[] = []

for (const { name: pkgName, build, external } of packages) {
  if (!build)
    continue

  const input = resolve(rootDir, `packages/${pkgName}/src/index.ts`)
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
    external: [...(external || [])],
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
