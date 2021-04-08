/*
 * @Author: Cphayim
 * @Date: 2019-10-06 01:32:07
 * @Description: 守卫入口
 */
// import { loginStateGuard } from './login-state'
// import { keepAliveGuard } from './keep-alive'

import { permissionGuard } from './permission'
import { doneProgressGuard, startProgressGuard } from './progress'
import { updateTitleGuard } from './title'

/**
 * 注册前置守卫
 * @param {VueRouter} router
 */
export function registerBeforeGuard(router) {
  // 守卫队列
  const guardQueue = [startProgressGuard, permissionGuard]
  guardQueue.forEach(guard => router.beforeEach(guard))
}

/**
 * 注册后置守卫
 * @param {VueRouter} router
 */
export function registerAfterGuard(router) {
  // 守卫队列
  const guardQueue = [updateTitleGuard, doneProgressGuard]
  guardQueue.forEach(guard => router.afterEach(guard))
}
