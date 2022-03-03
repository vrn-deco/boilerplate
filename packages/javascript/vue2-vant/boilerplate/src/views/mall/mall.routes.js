/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @Description: 商城模块路由
 */

import MallTabPage from './tab.vue'
import MallListPage from './list.vue'

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
