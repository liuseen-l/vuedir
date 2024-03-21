import path from 'node:path'
import type { OutputOptions, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import { rootDir } from './scripts/const'
import { packages } from './meta/packages'

const configs: RollupOptions[] = []

for (const { name: pkgName, build, external } of packages) {
  if (!build)
    continue

  const input = path.resolve(rootDir, `packages/${pkgName}/src/index.ts`)
  const output: OutputOptions[] = []

  output.push({
    file: path.resolve(rootDir, `packages/${pkgName}/dist/index.mjs`),
    format: 'es',
  })

  output.push({
    file: path.resolve(rootDir, `packages/${pkgName}/dist/index.cjs`),
    format: 'cjs',
  })

  configs.push({
    input,
    output,
    plugins: [esbuild(), resolve()],
    external: [...(external || [])],

  })

  configs.push({
    input,
    output: [
      { file: path.resolve(rootDir, `packages/${pkgName}/dist/index.d.ts`) },
      {
        file: path.resolve(rootDir, `packages/${pkgName}/dist/index.d.cts`),
      },
    ],
    plugins: [dts(), resolve()],
  })
}

export default configs
