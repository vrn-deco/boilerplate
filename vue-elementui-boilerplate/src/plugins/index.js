/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @LastEditTime: 2019-06-28 15:58:34
 * @Description: 插件入口
 */
import ElementUI from './element'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = Vue => {
  Vue.use(ElementUI)
}
