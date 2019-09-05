/*
 * @Author: Cphayim
 * @Date: 2019-05-24 10:22:40
 * @LastEditTime: 2019-06-24 09:49:47
 * @Description: 错误页面路由
 */

import Vue from 'vue'
import Router from 'vue-router'

import errorRoutes from './error'
import Home from '@/views/web/home/home.vue'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    // 错误页面路由规则
    ...errorRoutes,
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

export default router
