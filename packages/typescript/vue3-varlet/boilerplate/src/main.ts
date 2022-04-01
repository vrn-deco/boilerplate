import { createApp } from 'vue'

import { store } from '@/stores'
import { router } from '@/router'
import { registerPlugins } from '@/plugins'
import App from '@/App.vue'

import '@/assets/styles'

const app = createApp(App)
registerPlugins(app).use(store).use(router).mount('#app')
