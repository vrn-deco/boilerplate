import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useRouterStore } from '@/stores/router.store'

const routerStore = useRouterStore()

export function keepAliveGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const toDepth = to.meta.depth as number
  const fromDepth = from.meta.depth as number

  // 如果 to 开启缓存, 且从 from 是 to 的父页面或者 to 是第一屏页面
  if ((toDepth >= fromDepth || from.name === null) && to.meta.keepAlive) {
    // 将 to 添加到缓存列表
    routerStore.addKeepAlive(to.name!)
  }
  // 如果 from 开启缓存（已经被缓存）, 且 from 是 to 的子页面或兄弟页面
  if (from.meta.keepAlive && fromDepth >= toDepth) {
    // 将 from 移出缓存列表
    routerStore.rmKeepAlive(from.name!)
  }
  next()
}
