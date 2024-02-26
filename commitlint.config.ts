import fg from 'fast-glob'

function getPackages(packagePath: string) {
  return fg.sync('*', { cwd: packagePath, onlyDirectories: true })
}

const scopes = [
  ...getPackages('packages'),
  'docs',
  'play',
  'ci',
  'other',
  'build',
  'types',
]

export default {
  rules: {
    'scope-enum': [2, 'always', scopes],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      1,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'release',
        'feat',
        'fix',
        'style',
        'perf',
        'refactor',
        'revert',
        'test',
        'docs',
        'chore',
        'workflow',
        'ci',
        'types',
        'wip',
        'undef',
      ],
    ],
  },
}