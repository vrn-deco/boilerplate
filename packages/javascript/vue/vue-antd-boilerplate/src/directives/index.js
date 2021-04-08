/*
 * @Author: Cphayim
 * @Date: 2019-09-29 13:59:27
 * @Description: 指令入口
 */

export const registerDirectives = Vue => {
  // 这里注册你的全局指令
  // 防抖
  // 实例v-debounce:[arg]="[fn, event, arg]"
  Vue.directive('debounce', {
    inserted: function(el, binding, vnode) {
      let timer = null
      const delay = binding.arg || 500
      const [fn, event = 'click', ...arg] = binding.value
      el.addEventListener(event, () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn(...arg)
        }, delay)
      })
    },
  })
}
