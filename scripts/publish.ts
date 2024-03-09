import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { version } from '../package.json'
import { packages } from '../meta/packages'
import { rootDir } from './const'

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
  command += ' --tag beta'

for (const { name } of packages)
  execSync(command, { stdio: 'inherit', cwd: join(rootDir, 'packages', name, 'dist') })
  // consola.success(`Published @vuedir/${name}`)
