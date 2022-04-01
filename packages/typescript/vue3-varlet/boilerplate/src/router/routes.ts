import { RouteRecordRaw } from 'vue-router'

import mallRoutes from '@/views/mall/mall.routes'
import infoRoutes from '@/views/info/info.routes'
import userRoutes from '@/views/user/user.routes'

export default [
  {
    path: '/',
    redirect: '/mall',
  },
  ...mallRoutes,
  ...infoRoutes,
  ...userRoutes,
] as RouteRecordRaw[]
