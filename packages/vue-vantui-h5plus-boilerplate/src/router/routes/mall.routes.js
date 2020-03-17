/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @LastEditTime: 2020-03-14 18:21:28
 * @Description: 商城模块路由
 */

import { MallTabPage, MallDetailPage } from '@/views/mall'

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
    path: '/mall/detail',
    name: MallDetailPage.name,
    component: MallDetailPage,
    meta: {
      title: '详情',
      index: 1,
      keepAlive: false,
    },
  },
]
