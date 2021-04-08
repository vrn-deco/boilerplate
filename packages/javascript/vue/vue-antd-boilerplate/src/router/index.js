/*
 * @Author: Cphayim
 * @Date: 2020-07-13 01:51:51
 * @Description: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'

import config from '@/config'

import { registerBeforeGuard, registerAfterGuard } from './guards'
import { constantRoutes } from './routes'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: config.ENVS.ROUTE_MODE,
  routes: constantRoutes,
})

// 注册守卫
registerBeforeGuard(router)
registerAfterGuard(router)

export default router
