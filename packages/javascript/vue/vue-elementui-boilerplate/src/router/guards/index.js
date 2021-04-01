/*
 * @Author: Cphayim
 * @Date: 2019-10-06 01:32:07
 * @LastEditTime: 2020-05-26 21:42:34
 * @Description: 守卫入口
 */
// import { loginStateGuard } from './login-state'
// import { keepAliveGuard } from './keep-alive'

import { updateTitleGuard } from './title'

/**
 * 注册前置守卫
 * @param {VueRouter} router
 */
export function registerBeforeGuard(router) {
  // 守卫队列
  const guardQueue = []
  guardQueue.forEach(guard => router.beforeEach(guard))
}

/**
 * 注册后置守卫
 * @param {VueRouter} router
 */
export function registerAfterGuard(router) {
  // 守卫队列
  const guardQueue = [updateTitleGuard]
  guardQueue.forEach(guard => router.afterEach(guard))
}
