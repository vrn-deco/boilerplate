/*
 * @Author: benaozhi
 * @Date: 2020-01-07 10:46:43
 * @LastEditTime : 2020-01-07 11:14:01
 * @Description: 导出所有路由
 */
import demo from './demo.routes'
// 404页面
const NotFoundPage = resolve => {
  require.ensure(['@/views/system/pageUndefind.vue'], () => {
    resolve(require('@/views/system/pageUndefind.vue'))
  })
}
const BadPage = resolve => {
  require.ensure(['@/views/system/pageBadGateway.vue'], () => {
    resolve(require('@/views/system/pageBadGateway.vue'))
  })
}

const rootRoute = {
  path: '/',
  name: 'root',
  // 重定向到项目列表页
  redirect: demo[0].path,
}

export default [
  rootRoute,
  ...demo,
  // 兜底 404 页面
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
