/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:25:22
 * @LastEditTime: 2019-06-25 15:05:21
 * @Description: 事件
 */

/**
 * plusReady 事件
 * @param callack
 */
export function plusReady(callack) {
  if(window.plus) {
    callack()
  } else {
    document.addEventListener('plusready', callack, false)
  }
}

/**
 * 设备网络状态变化事件
 * @param netchangeCallback
 */
export function listenNetwork(netchangeCallback) {
  document.addEventListener('netchange', netchangeCallback, false)
}
