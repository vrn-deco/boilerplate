/*
 * @Author: Cphayim
 * @Date: 2020-01-07 10:46:43
 * @LastEditTime: 2020-07-13 02:16:26
 * @Description: 导出所有路由
 */

import NotFound from '@/views/web/404'

import homeRoutes from './home.routes'

// 根路由
const rootRoute = {
  path: '/',
  name: 'root',
  redirect: homeRoutes[0].path,
  meta: {
    title: '首页', // 该标题勿修改，面包屑组件使用
  },
}

export default [
  rootRoute,
  /* start: 路由配置数组 eg. ...routesArr */
  ...homeRoutes,
  /* end: 路由配置数组 */
  // 兜底 404 页面
  {
    name: 'NotFound',
    path: '*',
    component: NotFound,
  },
]
