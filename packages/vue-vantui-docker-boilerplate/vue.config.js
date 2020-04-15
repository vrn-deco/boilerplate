const { resolve } = require('path')
const { VueEnvLoader } = require('@naughty/vue-env-loader')

const config = new VueEnvLoader({
  // env 目录绝对路径
  envPath: resolve(__dirname, 'env'),
  // 自定义通过命令行参数注入单个环境变量所用的变量名
  customName: 'custom-env',
}).inject({
  productionSourceMap: false,
  publicPath: './',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')],
    },
  },
})

module.exports = config
