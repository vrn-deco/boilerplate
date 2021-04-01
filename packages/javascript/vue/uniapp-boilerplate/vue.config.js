/*
 * @Author: Cphayim
 * @Date: 2020-03-09 14:33:35
 * @LastEditTime: 2020-04-23 09:11:18
 * @Description: vue-cli 配置文件
 *    此文件尽量不要改动，如有通用的可靠方案
 *    请联系前端架构组，考虑集成到模板中
 */
const { resolve } = require('path')

module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    // 自动导入 scss 资源
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // !注意：
        // uni-app app-plus 端编译层不兼容 style-resources-loader
        // resolve(__dirname, 'src/assets/scss/libs/*.scss'),
      ],
    },
  },
  // 兼容方案：
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '~@/assets/scss/libs/index.scss';`,
      },
    },
  },
  // transpileDependencies: ['vuex-module-decorators']
}
