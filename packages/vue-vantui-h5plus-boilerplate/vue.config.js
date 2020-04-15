const { resolve } = require('path')
const { VueEnvLoader } = require('@naughty/vue-env-loader')
// 是否是 hybridApp 项目
const IS_APP = true
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
})

module.exports = config
