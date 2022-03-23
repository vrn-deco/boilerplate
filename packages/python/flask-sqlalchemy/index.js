const { runner } = require('@vrn-deco/boilerplate-preset-pip')

// Here, you should install and execute a preset or implement your own installation logic
module.exports = (opts) => runner({ ...opts, boiPackageDir: __dirname })

if (require.main === module) {
  runner({ boiPackageDir: __dirname })
}
