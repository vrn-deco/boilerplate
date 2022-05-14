/*
 * @Author: Cphayim
 * @Description: keepalive 添加/移除守卫
 */
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useRouterStore } from '@/stores/router.store'

export function keepAliveGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const toDepth = to.meta.depth ?? 0
  const fromDepth = from.meta.depth ?? 0

  const routerStore = useRouterStore()
  // 如果 to 开启缓存, 且从 from 是 to 的父页面或者 to 是第一屏页面
  if ((toDepth >= fromDepth || from.name === null) && to.meta.keepAlive) {
    // 将 to 添加到缓存列表
    routerStore.addKeepAlive(to.name as string)
  }
  // 如果 from 开启缓存（已经被缓存）, 且 from 是 to 的子页面或兄弟页面
  if (from.meta.keepAlive && fromDepth >= toDepth) {
    // 将 from 移出缓存列表
    routerStore.rmKeepAlive(from.name as string)
  }
  next()
}
