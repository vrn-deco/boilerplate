import { RouteRecordRaw } from 'vue-router'

import UserTab from './UserTab.vue'

export default [
  {
    path: '/user',
    name: 'UserTab',
    component: UserTab,
    meta: {
      title: '我的',
      depth: 0,
      keepAlive: true,
    },
  },
] as RouteRecordRaw[]
