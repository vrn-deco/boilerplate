import { LoginPage } from '@/views/auth'

/*
 * @Author: Cphayim
 * @Date: 2020-10-21 13:46:21
 * @LastEditTime: 2020-10-21 13:46:53
 * @Description: auth 路由
 */
export default [
  {
    path: '/login',
    name: LoginPage.name,
    component: LoginPage,
    meta: {
      title: '登录',
      keepAlive: false,
      menu: false,
      menuLevel: 1,
    },
  },
]
