/*
 * @Author: Cphayim
 * @Date: 2020-03-09 14:08:48
 * @LastEditTime: 2020-03-09 14:39:14
 * @Description:
 */

import Vue from 'vue'


// 导入所有全局样式文件（保证所有全局样式在组件样式之前，需要在 App.vue 之前导入）
import '@/assets/scss'

import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
