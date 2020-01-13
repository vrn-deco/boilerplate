import { home } from '@/views/web/home'
import { test } from '@/views/web/test'

export default [
  {
    path: '/home',
    redirect: '/home/test',
  },
  {
    path: '/home/index',
    name: home.name,
    component: home,
    meta: {
      title: '项目管理',
      index: 0,
      keepAlive: true,
    },
  },
  {
    path: '/home/test',
    name: home.test,
    component: test,
    meta: {
      title: '项目管理',
      index: 0,
      keepAlive: true,
    },
  },
]
