/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @LastEditTime: 2020-03-14 17:26:07
 * @Description: 用户模块路由
 */

import { UserTabPage } from '@/views/user'

export default [
  {
    path: '/user',
    redirect: '/user/tab',
  },
  {
    path: '/user/tab',
    name: UserTabPage.name,
    component: UserTabPage,
    meta: {
      title: '我',
      index: 0,
      keepAlive: false,
    },
  },
]
