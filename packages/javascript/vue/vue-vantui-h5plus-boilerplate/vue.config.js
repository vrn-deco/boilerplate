/*
 * @Author: Cphayim
 * @Date: 2019-11-18 9:25:54
 * @LastEditTime: 2020-04-23 09:14:54
 * @Description: vue-cli 配置文件
 *    此文件尽量不要改动，如有通用的可靠方案
 *    请联系前端架构组，考虑集成到模板中
 */
const { resolve } = require('path')
const { VueEnvLoader } = require('@naughty/vue-env-loader')
// 是否是 hybridApp 项目
const IS_APP = true
// 请修改此处的 APP_NAME 为项目名称
const APP_NAME = 'boilerplate'

const config = new VueEnvLoader({
  // env 目录绝对路径
  envPath: resolve(__dirname, 'env'),
  // 自定义通过命令行参数注入单个环境变量所用的变量名
  customName: 'custom-env',
}).inject({
  productionSourceMap: false,
  publicPath: './',
  outputDir: IS_APP ? `dist/${APP_NAME}` : 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')],
    },
  },
  chainWebpack(config) {
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
  },
})

module.exports = config
