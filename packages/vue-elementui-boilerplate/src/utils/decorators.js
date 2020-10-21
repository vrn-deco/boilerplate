/*
 * @Author: Cphayim
 * @Date: 2019-10-05 01:37:01
 * @LastEditTime: 2020-10-21 14:58:51
 * @Description: 装饰器
 */
import { Loading, Message } from 'element-ui'

/**
 * 用于装饰一个异步函数，在函数执行过程中打开 Loading.service
 * 遇到错误会将 err.message 使用 Message 反馈给用户
 * @param {*} opt
 */
export function UseLoading(message = '正在加载...') {
  return (t, k, p) => {
    const fn = p.value
    p.value = async function(...args) {
      const t = Loading.service({
        lock: true,
        text: message,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      try {
        const result = await fn.call(this, ...args)
        return result
      } catch (err) {
        console.error(err)
        process.env.NODE_ENV === 'devlopment' && console.error(err)
        Message({
          showClose: true,
          message: err.message || '未知异常',
          type: 'error',
        })
      } finally {
        t.close()
      }
    }
  }
}
