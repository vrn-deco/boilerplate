/*
 * @Author: benaozhi
 * @Date: 2020-07-13 01:51:51
 * @LastEditTime: 2020-10-21 09:56:40
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

import { registerBeforeGuard, registerAfterGuard } from './guards'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes
})

// 注册守卫
registerBeforeGuard(router)
registerAfterGuard(router)

export default router
