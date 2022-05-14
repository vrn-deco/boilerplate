/*
 * @Author: Cphayim
 * @Description: router guards register
 */
import type { NavigationGuardWithThis, NavigationHookAfter, Router } from 'vue-router'
// import { authGuard } from './auth'
import { keepAliveGuard } from './keep-alive'

export function registerBeforeGuard(router: Router): void {
  const guardQueue: NavigationGuardWithThis<unknown>[] = [
    // authGuard,
    keepAliveGuard,
  ]
  guardQueue.forEach((guard) => router.beforeEach(guard))
}

export function registerAfterGuard(router: Router): void {
  const guardQueue: NavigationHookAfter[] = []
  guardQueue.forEach((guard) => router.afterEach(guard))
}
