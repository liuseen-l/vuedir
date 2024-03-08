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
  [
    {
      files: ['playgrounds/**'],
      rules: {
        'no-console': 'off',
        'vue/no-unused-vars': 'off',
        'vue/no-sparse-arrays': 'off',
      },
    },
  ],
)
