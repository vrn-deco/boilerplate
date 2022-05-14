import { RouteRecordRaw } from 'vue-router'
import MallTab from './MallTab.vue'
import MallA from './MailA.vue'
import MallB from './MailB.vue'

export default [
  {
    path: '/mall',
    name: 'MallTab',
    component: MallTab,
    meta: {
      title: '商城',
      depth: 0,
      auth: true,
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
      auth: true,
      keepAlive: true,
    },
  },
  {
    path: '/mall/b',
    name: 'MallB',
    component: MallB,
    meta: {
      title: '商城B',
      auth: true,
      depth: 2,
    },
  },
] as RouteRecordRaw[]
