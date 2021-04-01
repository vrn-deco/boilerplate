/*
 * @Author: Cphayim
 * @Date: 2019-05-24 11:12:13
 * @LastEditTime: 2019-06-04 11:04:25
 * @Description: 弹层工具
 */
import { Dialog as _Dialog } from 'vant'

/**
 * 弹出框
 * @class
 * 包含 alert、confirm 和 show
 * 以下方法均返回 Promise
 * 通用请调 alert, confirm 方法（对 show 方法的柯里化）
 * 需要自定义请调 show 方法
 * 当确认时返回 Promise<true>，当取消时返回 Promise<false>
 */
export default class Dialog {
  /**
   * alert 警告框
   * @static
   * @param {Object} options
   * @param {string} [options.title = '提示'] 标题
   * @param {string} [options.message = '消息'] 消息内容
   * @return {Promise<true>}
   * @example
   * Dialog.alert({ message: '蓝屏警告!'}).then(_ => console.log('...'))
   */
  static alert({ title = '提示', message = '消息' } = {}) {
    return Dialog.show({ title, message, showCancelButton: false })
  }

  /**
   * confirm 确认框
   * @static
   * @param {Object} options
   * @param {string} [options.title = '提示'] 标题
   * @param {string} [options.message = '消息'] 消息内容
   * @return {Promise<boolean>}
   * @example
   * Dialog.confirm({ message: '点击确认引爆'}).then(isConfirm => {
   *  if(isConfirm) {
   *    console.log('BOOM!!!')
   *  } else {
   *    console.log('。。。')
   *  }
   * })
   */
  static confirm({ title = '提示', message = '消息' } = {}) {
    return Dialog.show({ title, message, showCancelButton: true })
  }

  /**
   * 显示弹框
   * @static
   * @param {Object} options
   * @param {string} [options.title = '提示'] 标题
   * @param {string} [options.message = '消息'] 消息内容
   * @param {'center'|'left'|'right'} [options.messageAlign = 'center'] 消息对齐方式
   * @param {string} [options.confirmButtonText = '确认'] 确认按钮文字
   * @param {string} [options.confirmButtonColor = '#1989fa'] 确认按钮颜色
   * @param {string} [options.cancelButtonText = '取消'] 取消按钮文字
   * @param {string} [options.cancelButtonColor = '#000'] 取消按钮颜色
   * @param {boolean} [options.overlay = true] 是否展示遮罩层
   * @param {boolean} [options.closeOnClickOverlay = false] 点击遮罩层时是否关闭弹窗
   * @param {boolean} [options.lockScroll] 是否锁定背景滚动
   * @return {Promise<boolean>}
   * @memberof Dialog
   */
  static show({
    title = '提示',
    message = '消息',
    messageAlign = 'center',
    confirmButtonText = '确认',
    confirmButtonColor = '#1989fa',
    cancelButtonText = '取消',
    cancelButtonColor = '#000',
    overlay = true,
    closeOnClickOverlay = false,
    lockScroll = true,
    showCancelButton = true,
  } = {}) {
    return new Promise((resolve, reject) => {
      _Dialog({
        title,
        message,
        messageAlign,
        confirmButtonText,
        confirmButtonColor,
        cancelButtonText,
        cancelButtonColor,
        overlay,
        closeOnClickOverlay,
        lockScroll,
        showCancelButton,
      })
        .then(_ => resolve(true))
        .catch(_ => resolve(false))
    })
  }
}
