/*
 * @Author: Cphayim
 * @Date: 2021-03-27 02:26:23
 * @Description: 系统管理路由
 */
import { RouteView } from '@/router/utils'

export const systemRouteNames = {
  index: 'System',
  user: {
    index: 'SystemUserManage',
  },
  resource: {
    index: 'SystemResourceManage',
  },
}

export default [
  {
    path: '/system',
    name: systemRouteNames.index,
    component: RouteView,
    // redirect:
    meta: { title: '系统管理', keepAlive: false, icon: 'database' },
    children: [
      {
        path: '/system/user',
        name: systemRouteNames.user.index,
        component: () => import(/* webpackChunkName: "system" */ './UserManage'),
        // redirect:
        meta: { title: '用户管理' },
      },
      {
        path: '/system/resource',
        name: systemRouteNames.resource.index,
        component: () => import(/* webpackChunkName: "system" */ './ResourceManage'),
        // redirect:
        meta: { title: '资源配置' },
      },
    ],
  },
]
