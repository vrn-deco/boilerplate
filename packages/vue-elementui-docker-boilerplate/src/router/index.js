import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/web/home/home.vue'
import demoRoutes from '@/views/demo/routes'

Vue.use(Router)

// 404页面
const NotFoundPage = resolve => {
  require.ensure(['@/views/system/pageUndefind.vue'], () => {
    resolve(require('@/views/system/pageUndefind.vue'))
  })
}
const BadPage = resolve => {
  require.ensure(['@/views/system/pageBadGateway.vue'], () => {
    resolve(require('@/views/system/pageBadGateway.vue'))
  })
}

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFoundPage,
      meta: { title: '404' }
    },
    {
      path: '/502',
      name: 'Bad',
      component: BadPage,
      meta: { title: '502' }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    ...demoRoutes
  ]
})

export default router
