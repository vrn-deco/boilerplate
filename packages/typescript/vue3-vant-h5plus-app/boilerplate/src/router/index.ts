/*
 * @Author: Cphayim
 * @Description: router
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { registerAfterGuard, registerBeforeGuard } from './guards'
import routes from './routes'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    depth: number
    auth?: boolean
    keepAlive?: boolean
  }
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

registerBeforeGuard(router)
registerAfterGuard(router)
