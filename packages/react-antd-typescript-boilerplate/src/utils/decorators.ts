import { trace } from 'console'

/*
 * @Author: Cphayim
 * @Date: 2020-07-17 14:00:34
 * @LastEditTime: 2020-07-22 16:42:58
 * @Description:
 */

/**
 * 方法装饰器
 * 将方法的 this 绑定自身
 *
 * @example
 * class A {
 *   @BindSelf
 *   fn1() {
 *     this.fn2()
 *   }
 *   fn2() {
 *     console.log('call fn2')
 *   }
 * }
 *
 * const a = new A()
 * const fn1 = a.fn1
 * fn1() // 'call fn2'
 */
export function BindSelf(): MethodDecorator {
  return (t: Object, p: string | symbol, d: PropertyDescriptor) => {
    const fn = d.value
    if (typeof fn === 'function') {
      d.value = fn.bind(t)
    }
  }
}

export function Throttle(delay = 200): MethodDecorator {
  let timeOut: number | null
  return (t: Object, p: string | symbol, d: PropertyDescriptor) => {
    const fn = d.value
    if (typeof fn !== 'function') {
      throw new TypeError(`${fn} is not a method`)
    }
    d.value = function (...args: any[]) {
      if (!timeOut) {
        timeOut = setTimeout(() => {
          timeOut = null
          fn.apply(this, args)
        }, delay)
      }
    }
  }
}
