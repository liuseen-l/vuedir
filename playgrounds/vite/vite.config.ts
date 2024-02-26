import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(() => ({
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