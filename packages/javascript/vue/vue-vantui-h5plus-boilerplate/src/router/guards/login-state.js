/*
 * @Author: Cphayim
 * @Date: 2019-10-06 01:32:46
 * @LastEditTime: 2019-10-29 14:08:46
 * @Description:
 */
import store from '@/store'
import authRoutes from '../routes/auth.routes'

/**
 * 登录状态守卫
 * 当 store 中的 isLogin 计算属性非 true 时
 * 阻止访问登录模块以外的页面
 * @typedef beforeGuard
 */
export function loginStateGuard(to, from, next) {
  const isLogin = store.getters['auth/isLogin']
  // 如果没有登录且访问了非 auth 模块的路由，重定向到登录页
  if (!isLogin && !inAuthRoutes(to.path)) {
    next(authRoutes[0].path)
  } else {
    next()
  }
}

/**
 * 检查一个 path 是否属于 auth.routes
 * @param {string} path
 * @return {boolean}
 */
function inAuthRoutes(path) {
  return authRoutes.some(route => route.path === path)
}
