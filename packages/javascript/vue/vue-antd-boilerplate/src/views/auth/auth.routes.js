/*
 * @Author: Cphayim
 * @Date: 2021-03-26 15:20:23
 * @Description: Auth 路由
 */
import { AuthLayout } from '@/layouts'

export const authRouteNames = {
  index: 'Auth',
  login: 'AuthLogin',
}

export default [
  {
    path: '/auth',
    name: authRouteNames.index,
    redirect: '/auth/login',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        name: authRouteNames.login,
        component: () => import('./Login'),
        meta: {
          title: '登录',
          keepAlive: false,
        },
      },
    ],
  },
]
