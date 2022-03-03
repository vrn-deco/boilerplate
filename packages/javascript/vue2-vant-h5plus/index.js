const { runner } = require('@vrn-deco/boilerplate-preset-npm')

module.exports = (opts) => runner({ ...opts, boiPackageDir: __dirname })

if (require.main === module) {
  runner({ boiPackageDir: __dirname })
}
