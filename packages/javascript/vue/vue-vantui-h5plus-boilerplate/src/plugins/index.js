/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @LastEditTime: 2019-07-01 01:50:08
 * @Description: 插件入口
 */

import './vconsole'
import Vant from './vant'
import VueH5Plus from './h5plus'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = Vue => {
  Vue.use(Vant)
  Vue.use(VueH5Plus)
}
