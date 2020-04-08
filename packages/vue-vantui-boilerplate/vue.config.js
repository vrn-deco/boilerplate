const argv = require('yargs').argv

const { resolve } = require('path')
module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')],
    },
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      // process.env
      definitions[0]['process.env'] = {
        ...definitions[0]['process.env'],
        CUSTOM_ENV: JSON.stringify(argv['custom-env']),
      }
      return definitions
    })
  },
}
