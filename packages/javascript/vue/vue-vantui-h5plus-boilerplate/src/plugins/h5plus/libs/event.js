/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:25:22
 * @LastEditTime: 2019-07-02 10:00:54
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
