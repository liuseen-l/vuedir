import { execSync } from 'node:child_process'
import process from 'node:process'
import fs from 'fs-extra'

const { version: oldVersion } = fs.readJSONSync('package.json')

execSync('bumpp -r --no-commit --no-tag --no-push', { stdio: 'inherit' })

const { version } = fs.readJSONSync('package.json')

if (oldVersion === version) {
  console.log('canceled')
  process.exit()
}

execSync('conventional-changelog -p angular -i changelogs/CHANGELOG.md -s -r 0', { stdio: 'inherit' })

execSync('git add .', { stdio: 'inherit' })
execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
// execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
