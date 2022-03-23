/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @Description: 插件入口
 */

import Element from './element'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = (Vue) => {
  Vue.use(Element)
}
