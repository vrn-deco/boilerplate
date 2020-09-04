/*
 * @Author: benaozhi
 * @Date: 2020-06-18 16:03:23
 * @LastEditTime: 2020-06-18 18:05:56
 * @Description:
 */
import { Notification } from 'element-ui'

export class Prompt {
  static success(opt) {
    Notification.success(opt)
  }
  /**
   * 通用方法
   * @param {Object} params
   * @param {string} [params.title] 标题
   * @param {string|Vue.VNode} [params.message] 说明文字
   * @param {boolean} [params.dangerouslyUseHTMLString] 是否将 message 属性作为 HTML 片段处理
   * @param {string} [params.type] 主题样式，如果不在可选值内将被忽略
   * @param {string} [params.iconClass] 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
   * @param {number} [params.duration] 显示时间, 毫秒。设为 0 则不会自动关闭
   * @param {string} [params.position] 自定义弹出位置
   * @param {boolean} [params.showClose] 是否显示关闭按钮
   * @param {function} [params.onClose] 关闭时的回调函数
   * @param {function} [params.onClick] 点击 Notification 时的回调函数
   * @param {number} [params.offset] 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量
   */
  static info({
    title,
    message,
    dangerouslyUseHTMLString,
    type,
    iconClass,
    duration,
    position,
    showClose,
    onClose,
    onClick,
    offset
  }) {
    Notification({
      title,
      message,
      dangerouslyUseHTMLString,
      type,
      iconClass,
      duration,
      position,
      showClose,
      onClose,
      onClick,
      offset
    })
  }
  static warning(opt) {
    Notification.warning(opt)
  }
  static error(opt) {
    Notification.error(opt)
  }
}
