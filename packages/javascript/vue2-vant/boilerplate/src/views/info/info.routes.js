/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @Description: 资讯模块路由
 */

import InfoTabPage from './tab.vue'

export default [
  {
    path: '/info',
    redirect: '/info/tab',
  },
  {
    path: '/info/tab',
    name: InfoTabPage.name,
    component: InfoTabPage,
    meta: {
      title: '资讯',
      index: 0,
      keepAlive: false,
    },
  },
]
