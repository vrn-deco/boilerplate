import { isMain, runner } from '@vrn-deco/boilerplate-preset-npm'

const __dirname = new URL('.', import.meta.url).pathname

// Here, you should install and execute a preset or implement your own installation logic
export default (opts) => {
  return runner({ ...opts, boiPackageDir: __dirname })
}

if (isMain(import.meta)) {
  runner({ boiPackageDir: __dirname })
}
