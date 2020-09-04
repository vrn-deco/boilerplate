/*
 * @Autor: yugeStrive
 * @Date: 2020-07-21 08:50:19
 * @LastEditTime: 2020-08-25 10:25:53
 * @Description: 装饰器
 */
import { message as Toast } from 'antd'
/**
 * 用于将this指向方法本身
 */
export function BindSelf() {
  return (t, k, p) => {
    const fn = p.value
    if (typeof fn !== 'function') {
      throw new TypeError('只能绑定在方法上')
    }
    return {
      get() {
        return fn.bind(this)
      },
    }
  }
}

/**
 * 用于装饰一个异步函数，在函数执行过程中打开 Toast.loading
 * 遇到错误会将 err.message 使用 Toast 反馈给用户
 * @param {*} opt
 */
export function UseLoading(loadingMessage = '正在加载...', successMessage = '') {
  return (t, k, p) => {
    const fn = p.value
    if (typeof fn !== 'function') {
      throw new TypeError(`${fn} is not a method`)
    }
    p.value = async function(...args) {
      loadingMessage && Toast.loading({ content: loadingMessage, duration: 0 })
      try {
        const result = await fn.call(this, ...args)
        loadingMessage && Toast.destroy()
        successMessage && Toast.success(successMessage)
        return result
      } catch (err) {
        loadingMessage && Toast.destroy()
        process.env.NODE_ENV === 'development' && console.error(err.message)
        if (err.message === 'Network Error') {
          err.message = '网络异常，服务无响应'
        }
        Toast.error({ content: err.message || '未知异常', duration: 5 /* 持续 5 秒 */ })
      }
    }
  }
}
/**
 * 防抖，防止触发多次点击，造成资源浪费
 * (在N秒内只能执行一次事件，若在N秒内再次进行触发，则会清除前一个事件，重新进行计算)
 * @param {Number} delay
 */
export function Debounce(delay = 100) {
  let timeOut
  return (t, k, p) => {
    const fn = p.value
    p.value = function (...args) {
      if (timeOut) clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        fn.call(this, ...args)
      }, delay)
    }
  }
}

/**
 * 节流，防止触发多次点击，造成资源浪费
 * (连续触发事件在N秒内只执行一次函数，会起到稀释效果)
 * @param {Number} delay
 */
export function Throttle(delay = 200) {
  let timeOut
  return (t, k, p) => {
    const fn = p.value
    p.value = function (...args) {
      if (!timeOut) {
        timeOut = setTimeout(() => {
          timeOut = null
          fn.apply(this, args)
        }, delay)
      }
    }
  }
}

/**
 * 锁
 * @param 
 */
export function Lock() {
  return (t, k, p) => {
    let locked = false
    const fn = p.value
    p.value = async function (...args) {
      if (locked) return
      try {
        locked = true
        await fn.call(this, ...args)
      } catch (error) {
        console.err(error)
      } finally {
        locked = false
      }
    }
  }
}
