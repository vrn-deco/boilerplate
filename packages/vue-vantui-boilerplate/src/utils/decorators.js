/*
 * @Author: Cphayim
 * @Date: 2019-10-05 01:37:01
 * @LastEditTime: 2019-10-12 11:08:28
 * @Description: 装饰器
 */
import { Toast } from 'vant'

/**
 * 用于装饰一个异步函数，在函数执行过程中打开 Toast.loading
 * 遇到错误会将 err.message 使用 Toast 反馈给用户
 * @param {*} opt
 */
export function UseLoading(message = '正在加载...') {
  return (t, k, p) => {
    const fn = p.value
    p.value = async function(...args) {
      const t = Toast.loading({ message, duration: -1 })
      try {
        const result = await fn.call(this, ...args)
        t.clear()
        return result
      } catch (err) {
        process.env.NODE_ENV === 'devlopment' && console.error(err)
        Toast({ message: err.message })
      }
    }
  }
}
