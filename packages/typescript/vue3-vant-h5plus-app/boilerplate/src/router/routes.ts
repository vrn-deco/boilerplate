/*
 * @Author: Cphayim
 * @Description: 模块路由汇总
 */
import { RouteRecordRaw } from 'vue-router'

import mallRoutes from '@/views/mall/mall.routes'
import infoRoutes from '@/views/info/info.routes'
import userRoutes from '@/views/user/user.routes'
import authRoutes from '@/views/auth/auth.routes'

export default [
  {
    path: '/',
    redirect: '/mall',
  },
  ...authRoutes,
  ...mallRoutes,
  ...infoRoutes,
  ...userRoutes,
] as RouteRecordRaw[]
