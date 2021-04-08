/*
 * @Author: Cphayim
 * @Date: 2021-03-25 17:07:41
 * @Description: 导出所有路由
 */
import { BasicLayout } from '@/layouts/index'

import exceptionRoutes from '@/views/exception/exception.routes'
import authRoutes from '@/views/auth/auth.routes'
import dashboardRoutes from '@/views/dashboard/dashboard.routes'
import systemRoutes from '@/views/system/system.routes'

/**
 * 常量路由
 * 不需要登录就确定存在的路由
 */
export const constantRoutes = [...exceptionRoutes, ...authRoutes]

/**
 * 异步路由
 * 需要登录后再确定动态添加的路由
 */
export const asyncRoutes = [
  // BasicLayout 下的页面
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    redirect: dashboardRoutes[0].path,
    meta: {
      title: '首页',
      skipPermission: true,
    },
    children: [
      ...dashboardRoutes, // 仪表盘
      ...systemRoutes, // 系统管理
    ],
  },
  // 兜底
  {
    path: '*',
    redirect: exceptionRoutes[0].path, // 404
    meta: {
      skipPermission: true,
    },
  },
]
