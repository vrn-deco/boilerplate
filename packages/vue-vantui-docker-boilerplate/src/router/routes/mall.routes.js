/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @LastEditTime: 2020-05-14 16:01:55
 * @Description: 商城模块路由
 */

import { MallTabPage, MallListPage } from '@/views/mall'

export default [
  {
    path: '/mall',
    redirect: '/mall/tab',
  },
  {
    path: '/mall/tab',
    name: MallTabPage.name,
    component: MallTabPage,
    meta: {
      title: '商城',
      index: 0,
      keepAlive: false,
    },
  },
  {
    path: '/mall/list',
    name: MallListPage.name,
    component: MallListPage,
    meta: {
      title: '商品列表',
      index: 1,
      keepAlive: false,
    },
  },
]
