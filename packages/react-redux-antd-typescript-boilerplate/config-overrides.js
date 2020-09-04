/*
 * @Author: Cphayim
 * @Date: 2019-08-28 17:22:39
 * @LastEditTime: 2019-11-15 13:44:38
 * @Description: create-react-app 配置重写
 */

const path = require('path')
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  // antd按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
)
