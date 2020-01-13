import { updateTitleGuard } from './title'

/**
 * 注册前置守卫
 * @param {VueRouter} router
 */
export function registerBeforeGuard(router) {
  // TODO 守卫队列

}

/**
 * 注册后置守卫
 * @param {VueRouter} router
 */
export function registerAfterGuard(router) {
  // TODO 守卫队列
  const guardQueue = [ updateTitleGuard ]
  guardQueue.forEach(guard => router.afterEach(guard))
}
