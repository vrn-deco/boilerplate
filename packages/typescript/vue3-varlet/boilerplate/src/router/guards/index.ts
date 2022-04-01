/*
 * @Author: Cphayim
 * @Description: router guards register
 */
import type { NavigationGuardWithThis, NavigationHookAfter, Router } from 'vue-router'

export function registerBeforeGuard(router: Router): void {
  const guardQueue: NavigationGuardWithThis<unknown>[] = []
  guardQueue.forEach((guard) => router.beforeEach(guard))
}

export function registerAfterGuard(router: Router): void {
  const guardQueue: NavigationHookAfter[] = []
  guardQueue.forEach((guard) => router.afterEach(guard))
}
