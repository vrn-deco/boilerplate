/*
 * @Author: Cphayim
 * @Date: 2019-08-28 17:22:39
 * @LastEditTime: 2020-07-21 14:29:24
 * @Description: create-react-app 配置重写
 */

const path = require('path')
const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    '@': resolve('src'),
  }),
  // antd按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // 使用装饰器
  addDecoratorsLegacy()
)
