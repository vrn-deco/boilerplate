/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:25:22
 * @Description: 事件
 */

/**
 * plusReady 事件
 * @param callack
 */
export function plusReady(callack) {
  if (window.plus) {
    callack()
  } else {
    document.addEventListener('plusready', callack, false)
  }
}
