/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:18:38
 * @Description: 用户模块路由
 */

import HomePage from './index.vue'

export default [
  {
    path: '/home',
    name: HomePage.name,
    component: HomePage,
    meta: {
      title: '首页',
      keepAlive: false,
    },
  },
]
