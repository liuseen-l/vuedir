import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [
    Vue(),
  ],
  // resolve: command === 'build'
  //   ? {}
  //   : {
  //     alias: {
  //       '@vuedir/core': resolve(__dirname, '../../packages/core/index.ts'),
  //       '@vuedir/shared': resolve(__dirname, '../../packages/shared/index.ts'),
  //     },
  //   },
}))