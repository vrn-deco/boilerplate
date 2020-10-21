/*
 * @Author: benaozhi
 * @Date: 2020-07-27 23:42:53
 * @LastEditTime: 2020-10-21 14:54:08
 * @Description:
 */
import Mock from 'mockjs'

// 使用 webpack 的 require.context() 遍历所有mock文件
const files = require.context('.', true, /\.mock\.js$/)
Mock.setup({
  timeout: '200-600'
})

let configArray = []

files.keys().forEach((key) => {
  configArray.push(files(key).default)
})

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split('|')
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target)
  }
})
