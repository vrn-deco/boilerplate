/*
 * @Author: benaozhi
 * @Date: 2020-07-13 01:52:30
 * @LastEditTime: 2020-08-04 12:01:04
 * @Description:
 */
import { home } from '@/views/web/home'

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
