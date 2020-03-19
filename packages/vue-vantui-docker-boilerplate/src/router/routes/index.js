/*
 * @Author: Cphayim
 * @Date: 2020-01-07 10:46:43
 * @LastEditTime: 2020-03-14 17:27:55
 * @Description: 导出所有路由
 */

import NotFound from '@/views/404'

import mallRoutes from './mall.routes'
import infoRoutes from './info.routes'
import userRoutes from './user.routes'

const rootRoute = {
  path: '/',
  name: 'root',
  // 重定向到项目列表页
  redirect: mallRoutes[0].path,
}

export default [
  rootRoute,
  ...mallRoutes,
  ...infoRoutes,
  ...userRoutes,
  // 兜底 404 页面
  {
    name: 'NotFound',
    path: '*',
    component: NotFound,
  },
]
