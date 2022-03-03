/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @Description: 插件入口
 */

import './vconsole'
import Vant from './vant'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = (Vue) => {
  Vue.use(Vant)
}
