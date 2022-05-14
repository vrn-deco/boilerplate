import { RouteRecordRaw } from 'vue-router'
import InfoTab from './InfoTab.vue'

export default [
  {
    path: '/info',
    name: 'InfoTab',
    component: InfoTab,
    meta: {
      title: '资讯',
      depth: 0,
      auth: true,
      keepAlive: true,
    },
  },
] as RouteRecordRaw[]
