import { fileURLToPath } from 'node:url'
import { isMain, runner } from '@vrn-deco/boilerplate-preset-pip'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Here, you should install and execute a preset or implement your own installation logic
export default (opts) => {
  return runner({ ...opts, boiPackageDir: __dirname })
}

if (isMain(import.meta)) {
  runner({ boiPackageDir: __dirname })
}
