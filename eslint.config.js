import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
    jsonc: true,
    jsx: false,
    yaml: false,
    markdown: false,
    ignores: [
      ' **/dist',
      '**/node_modules',
    ],
  },
)
