/*
 * @Autor: yugeStrive
 * @Date: 2020-07-21 08:50:19
 * @LastEditTime: 2020-07-29 14:13:42
 * @Description: 装饰器
 */

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
export function UseLoading(message = '正在加载...') {
  return (t, k, p) => {
    const fn = p.value
    p.value = async function (...args) {
      // const t = Toast.loading({ message, duration: -1 })
      try {
        const result = await fn.call(this, ...args)
        // t.clear()
        return result
      } catch (err) {
        // process.env.NODE_ENV === 'devlopment' && console.error(err)
        // Toast({ message: err.message })
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
