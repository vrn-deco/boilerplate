import Vue from 'vue'
import platform from './feture/platform'
import { plusReady, listenNetwork } from './feture/event'
import { isFunction } from '@babel/types'

Vue.mixin({
  beforeCreate() {
    // 当前处于 plus 运行环境中
    if(platform.plus) {
      const _options = this.$options
      // 注册 plusready 事件
      plusReady(
        function() {
          // 执行 plusReady 的回调
          if(isFunction(_options.plusReady)) {
            _options.plusReady.call(this)
          }
          // 注册 listenNetwork 的回调
          if(isFunction(_options.listenNetwork)) {
            listenNetwork(function() {
              _options.listenNetwork.call(this)
            })
          }
        }.bind(this)
      )
    }
  }
})
