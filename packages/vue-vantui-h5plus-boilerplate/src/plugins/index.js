/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @LastEditTime: 2019-05-27 14:52:18
 * @Description: 插件入口
 */
import Vant from './vant'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = Vue => {
  Vue.use(Vant)
}
