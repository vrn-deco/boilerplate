/*
 * @Author: Cphayim
 * @Date: 2019-10-06 01:32:46
 * @Description: 访问许可守卫
 */
import { notification } from 'ant-design-vue'

import store from '@/store'
import authRoutes, { authRouteNames } from '@/views/auth/auth.routes'
import { exceptionRouteNames } from '@/views/exception/exception.routes'

import router from '..'

export function permissionGuard(to, from, next) {
  store.getters['auth/isLogin'] ? handleLogined(to, from, next) : handleUnLogin(to, from, next)
}

/**
 * 已登录情况
 */
async function handleLogined(to, from, next) {
  // 如果访问的是登录页，重定向到首页
  if (to.name === authRouteNames.login) {
    return next({ path: '/' })
  }

  // 在白名单 或 已经获取过资源菜单并生成动态路由
  if (inWhiteList(to.path) || store.getters['auth/resources'].length > 0) {
    return next()
  }

  // 获取当前用户信息和可用资源
  const resources = await store.dispatch('auth/getInfo')

  if (!resources || !resources.length) {
    // 用户没有可用资源，无法生成路由，返回 403 页面
    notification.warning({
      message: '警告',
      description: '抱歉，当前用户没有可用的资源访问权限，请联系管理员。',
    })
    next({ name: exceptionRouteNames[403] })
  } else {
    // 生成可访问路由
    const accessedRoutes = await store.dispatch('permission/generateRoutes', resources)
    if (accessedRoutes && accessedRoutes.length) {
      router.addRoutes(accessedRoutes)

      // 带有 redirect 重定向时，登录自动重定向到该地址
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      to.path === redirect ? next({ ...to, replace: true }) : next({ path: redirect })
    }
  }
}

/**
 * 未登录情况
 */
async function handleUnLogin(to, from, next) {
  // 如果访问的是白名单页面，允许访问
  // 否则重定向到登录页
  inWhiteList(to.path)
    ? next()
    : next({ name: authRouteNames.login, query: { redirect: to.fullPath } })
}

// 白名单模块（不需要登录）的正则
const whiteList = [
  /^\/e\d{3}/, // 错误页 /e403、/e404、/e500
  new RegExp(`^${authRoutes[0].path}`), // 认证模块 /^/auth/
]

function inWhiteList(path) {
  return whiteList.some(reg => reg.test(path))
}
