import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
    vue: true,
    jsonc: true,
    yaml: true,
    jsx: true,
    markdown: true,
    ignores: [
      ' **/dist',
      '**/node_modules',
      '**/*.svg',
      '**/cache',
    ],
  },
)
