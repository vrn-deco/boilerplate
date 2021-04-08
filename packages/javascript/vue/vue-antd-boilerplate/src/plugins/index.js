/*
 * @Author: Cphayim
 * @Date: 2019-05-23 14:21:59
 * @Description: 插件入口
 */
import { registerAntdComponents } from './antd'

import './nprogress'

/**
 * 注册插件
 * @param {Vue} Vue
 */
export const registerPlugins = Vue => {
  // 注册 antd 组件
  registerAntdComponents(Vue)
}
