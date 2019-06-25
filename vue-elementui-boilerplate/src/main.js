import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { registerEventBus } from './utils/event-bus'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 将 eventBus 注册到 vue 实例，使用 this.$bus 访问
registerEventBus()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
