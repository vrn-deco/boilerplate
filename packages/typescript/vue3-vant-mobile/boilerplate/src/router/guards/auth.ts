/*
 * @Author: Cphayim
 * @Description: 登录态守卫
 */
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const authStore = useAuthStore()
  if (to.meta.auth && !authStore.isLogin) {
    next('/login')
  } else {
    next()
  }
}
