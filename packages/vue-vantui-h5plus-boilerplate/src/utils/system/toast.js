/*
 * @Author: Cphayim
 * @Date: 2019-05-24 11:12:13
 * @LastEditTime: 2019-06-04 11:00:47
 * @Description: 轻提示
 */

import { Toast as _Toast } from 'vant'

// _Toast.allowMultiple()

export default class Toast {
  #instance = _Toast
  /**
   * 打开 loading
   * @param {Object} options
   * @param {string} [options.message = '加载中...'] 消息
   * @param {'middle'|'top'|'bottom'} [options.position = 'middle'] 显示位置
   * @param {boolean} [options.mask = true] 是否显示背景遮罩层
   * @param {boolean} [options.forbidClick = true] 是否禁止背景点击
   * @param {number} [options.duration = 0] 展示时长(ms)，值为 0 时，toast 不会消失
   * @return {void}
   * @example
   * Toast.loading({message: 'Calling Aozhi...'})
   * axios.post('xxx').then(res => Toast.clear())
   */
  static loading({
    message = '加载中...',
    position = 'middle',
    mask = true,
    forbidClick = true,
    duration = 0,
  } = {}) {
    this.#instance.loading({ message, position, mask, forbidClick, duration })
  }

  /**
   * 显示成功提示
   * @param {Object} options
   * @param {string} [options.message = '成功'] 消息
   * @param {'middle'|'top'|'bottom'} [options.position = 'middle'] 显示位置
   * @param {boolean} [options.mask = false] 是否显示背景遮罩层
   * @param {boolean} [options.forbidClick = true] 是否禁止背景点击
   * @param {number} [options.duration = 2500] 展示时长(ms)，值为 0 时，toast 不会消失
   * @return {void}
   * @example
   * Toast.success({message: '减肥成功'})
   */
  static success({
    message = '成功',
    position = 'middle',
    mask = false,
    forbidClick = true,
    duration = 2500,
  } = {}) {
    this.#instance.success({ message, position, mask, forbidClick, duration })
  }

  /**
   * 显示失败提示
   * @param {Object} options
   * @param {string} [options.message = '失败'] 消息
   * @param {'middle'|'top'|'bottom'} [options.position = 'middle'] 显示位置
   * @param {boolean} [options.mask = false] 是否显示背景遮罩层
   * @param {boolean} [options.forbidClick = true] 是否禁止背景点击
   * @param {number} [options.duration = 2500] 展示时长(ms)，值为 0 时，toast 不会消失
   * @return {void}
   * @example
   * Toast.fail({message: '减肥失败'})
   */
  static fail({
    message = '失败',
    position = 'middle',
    mask = false,
    forbidClick = true,
    duration = 2500,
  } = {}) {
    this.#instance.fail({ message, position, mask, forbidClick, duration })
  }

  /**
   * 清除屏幕上的 Toast
   * @return {void}
   * @example
   * Toast.clear()
   */
  static clear() {
    this.#instance.clear()
  }
}
