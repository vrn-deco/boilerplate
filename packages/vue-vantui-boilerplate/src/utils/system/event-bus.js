/*
 * @Author: Cphayim
 * @Date: 2019-05-12 17:46:19
 * @LastEditTime: 2019-06-03 13:30:01
 * @Description: EventBus（基于 Vue 内置的自定义事件）
 */

import Vue from 'vue'

export default class EventBus {
  /**
   * @private
   */
  #eventCenter = new Vue()

  /**
   * 创建订阅
   * @public
   * @param {string} event 事件名
   * @param {Function} callback 回调函数
   */
  on(event, callback) {
    this.#eventCenter.$on(event, callback)
  }

  /**
   * 取消订阅
   * @public
   * @param {string} event 事件名
   * @param {Function} callback 回调函数
   */
  off(event, callback) {
    this.#eventCenter.$off(event, callback)
  }

  /**
   * 创建订阅（单次触发后自动取消）
   * @public
   * @param {string} event 事件名
   * @param {Function} callback 回调函数
   */
  once(event, callback) {
    this.#eventCenter.$once(event, callback)
  }

  /**
   * 发布
   * @public
   * @param {string} event 事件名
   * @param  {...any} args
   */
  emit(event, ...args) {
    this.#eventCenter.$emit(event, ...args)
  }
}

/**
 * 注册 EventBus 到 Vue 实例
 */
export const registerEventBus = () => {
  Vue.prototype.$bus = new EventBus()
}
