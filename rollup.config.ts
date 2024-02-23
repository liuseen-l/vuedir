import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import dts from 'rollup-plugin-dts'

const configs: RollupOptions[] = []
// configs.push({
//   input: 'packages/core/index.ts',
//   output: [
//     {
//       dir: 'packages/core/dist/es',
//       format: 'es',
//       entryFileNames: '[name].mjs',
//       chunkFileNames: '[name]-[hash].mjs',
//       preserveModules: true,
//       preserveModulesRoot: path.resolve(__dirname, 'packages/core'),
//     },

//   ],
//   plugins: [typescript()],
// })

configs.push({
  input: 'packages/core/index.ts',
  output: [
    {
      dir: 'packages/core/dist/es',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, 'packages'),
    },

  ],
  plugins: [dts(), (() => ({
    name: 'rollup-plugin-resolveDts',
    renderChunk(_code, chunk) {
      if (chunk.fileName === 'core/index.d.ts') {
        return {
          code: `export { vFocus } from './v-focus';export { vLock } from './v-lock';`
        }
      }
    }
  }))()],
})

export default configs