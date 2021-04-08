/*
 * @Author: Cphayim
 * @Date: 2021-03-26 11:29:48
 * @Description:
 */
import { RouteView } from '@/router/utils'

export const dashboardRouteNames = {
  index: 'Dashboard',
  workPlace: 'DashboardWorkPlace',
}

export default [
  {
    name: dashboardRouteNames.index,
    path: '/dashboard',
    redirect: '/dashboard/workplace',
    component: RouteView,
    meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard' },
    children: [
      {
        name: dashboardRouteNames.workPlace,
        path: '/dashboard/workplace',
        component: () => import(/* webpackChunkName: "dashboard" */ './WorkPlace'),
        meta: { title: '工作台', keepAlive: true },
      },
    ],
  },
]
