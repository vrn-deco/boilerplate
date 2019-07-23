/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:06:21
 * @LastEditTime: 2019-07-02 10:52:30
 * @Description: 安装器
 */
import platform from './libs/platform'

import Network from './libs/network'
import Geolocation from './libs/geolocation'
import Screen from './libs/screen'
import Audio from './libs/audio'

import { plusReady } from './libs/event'
import { isFunction } from './utils'

let IS_READY = false
const VueH5Plus = {}
// 安装器
VueH5Plus.install = Vue => {
  Vue.mixin({
    created() {
      // 当前处于 plus 平台下
      if(platform.plus) {
        const _options = this.$options
        // 注册 plusready 事件
        plusReady(() => {
          if(!IS_READY) {
            process.env.NODE_ENV !== 'production' && console.info('PLUS_READY : 运行时准备就绪')
            IS_READY = true
          }
          // 执行 plusReady 的回调
          if(isFunction(_options.plusReady)) {
            _options.plusReady.call(this)
          }
        })
      }
    }
  })
  const plus = {
    Screen,
    Network,
    Geolocation,
    Audio
  }
  bindToVuePrototype(Vue, {
    plus,
    plusReady, // 注册 plusready 事件
    plusOriginal: window.plus // 直接暴露的 plus 对象
  })
}

/**
 * 绑定内容到 Vue.prototype
 * @param {Object} o
 */
function bindToVuePrototype(Vue, o = {}) {
  Object.keys(o).forEach(key => (Vue.prototype['$' + key] = o[key]))
}

// 直接引入兼容
if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.use()
}

export default VueH5Plus
