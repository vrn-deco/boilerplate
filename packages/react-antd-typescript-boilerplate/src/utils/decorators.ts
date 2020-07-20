import { trace } from 'console'

/*
 * @Author: Cphayim
 * @Date: 2020-07-17 14:00:34
 * @LastEditTime: 2020-07-17 14:16:35
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
export const BindSelf: MethodDecorator = (t, p, d) => {
  const fn = d.value
  if (typeof fn === 'function') {
    d.value = fn.bind(t)
  }
}
