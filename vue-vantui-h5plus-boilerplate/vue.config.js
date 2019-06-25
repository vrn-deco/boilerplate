const { resolve } = require('path')
// 是否是 hybridApp 项目
const IS_APP = true
const APP_NAME = 'boilerplate'
module.exports = {
  productionSourceMap: false,
  publicPath: IS_APP ? './' : '/',
  outputDir: IS_APP ? `dist/${APP_NAME}` : 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')]
    }
  }
}
