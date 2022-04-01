/*
 * @Author: Cphayim
 * @Description: router
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { registerAfterGuard, registerBeforeGuard } from './guards'
import routes from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

registerBeforeGuard(router)
registerAfterGuard(router)
