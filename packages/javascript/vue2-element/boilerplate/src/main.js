/*
 * @Author: Cphayim
 * @Date: 2019-05-23 09:14:55
 * @Description: 入口文件
 */

import Vue from 'vue'

// 导入所有全局样式文件（保证所有全局样式在组件样式之前，需要在 App.vue 之前导入）
import '@/assets/scss'

import { registerPlugins } from '@/plugins'
import { registerFilters } from '@/filters'

import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

Vue.config.productionTip = false

// 注册所有插件
registerPlugins(Vue)
// 注册全局过滤器
registerFilters(Vue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
