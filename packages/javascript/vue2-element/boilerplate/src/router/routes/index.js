/*
 * @Author: Cphayim
 * @Date: 2020-01-07 10:46:43
 * @Description: 导出所有路由
 */

import NotFound from '@/views/404'

import homeRoutes from '@/views/home/home.routes'

const rootRoute = {
  path: '/',
  name: 'root',
  redirect: homeRoutes[0].path,
}

export default [
  rootRoute,
  ...homeRoutes,
  // 兜底 404 页面
  {
    name: 'NotFound',
    path: '*',
    component: NotFound,
  },
]
