/*
 * @Author: benaozhi
 * @Date: 2020-07-13 01:52:30
 * @LastEditTime: 2020-10-21 10:58:21
 * @Description:
 */
import { home } from '@/views/home'

export default [
  {
    path: '/home',
    name: home.name,
    component: home,
    meta: {
      title: '主页',
      keepAlive: false,
      menu: true,
      menuLevel: 1,
    },
    children: [],
  }
]
