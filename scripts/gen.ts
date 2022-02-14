import path from 'node:path'
import execa from 'execa'

export function genManifest() {
  execa.commandSync('pnpm gen --filter @vrn-deco/boilerplate-manifest', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '../'),
  })
}

if (require.main === module) {
  process.argv.includes('--manifest') && genManifest()
}
