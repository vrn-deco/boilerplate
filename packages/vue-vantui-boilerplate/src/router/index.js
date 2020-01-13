/*
 * @Author: Cphayim
 * @Date: 2019-05-24 10:22:40
 * @LastEditTime : 2020-01-07 11:22:14
 * @Description: 错误页面路由
 */

import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

import { registerBeforeGuard, registerAfterGuard } from './guards'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

// 注册守卫
registerBeforeGuard(router)
registerAfterGuard(router)

export default router
