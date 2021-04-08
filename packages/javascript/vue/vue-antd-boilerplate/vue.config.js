/*
 * @Author: Cphayim
 * @Date: 2019-09-03 14:33:35
 * @Description: vue-cli 配置文件
 */
const { resolve } = require('path')

module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.less')],
    },
  },
}
