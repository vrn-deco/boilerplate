import { RouteRecordRaw } from 'vue-router'
import MallTab from './MallTab.vue'
import MallA from './A.vue'
import MallB from './B.vue'

export default [
  {
    path: '/mall',
    name: 'MallTab',
    component: MallTab,
    meta: {
      title: '商城',
      depth: 0,
      keepAlive: true,
    },
  },
  {
    path: '/mall/a',
    name: 'MallA',
    component: MallA,
    meta: {
      title: '商城A',
      depth: 1,
      keepAlive: true,
    },
  },
  {
    path: '/mall/b',
    name: 'MallB',
    component: MallB,
    meta: {
      title: '商城B',
      depth: 2,
    },
  },
] as RouteRecordRaw[]
