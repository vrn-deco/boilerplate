/*
 * @Author: Cphayim
 * @Date: 2019-05-24 10:22:40
 * @LastEditTime: 2019-05-24 10:23:56
 * @Description: 错误页面路由
 */

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
export default [
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
