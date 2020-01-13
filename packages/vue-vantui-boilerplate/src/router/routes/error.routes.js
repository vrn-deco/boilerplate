import NotFoundPage from '@/views/system/pageUndefind.vue'
import BadPage from '@/views/system/pageBadGateway.vue'

export default [
  {
    path: '/home',
    redirect: '/home/test',
  },
  {
    // 404 页面
    path: '*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: '404' }
  },
  {
    // 502 页面
    path: '/502',
    name: 'Bad',
    component: BadPage,
    meta: { title: '502' }
  }
]
