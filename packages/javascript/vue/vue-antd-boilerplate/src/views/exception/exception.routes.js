/*
 * @Author: Cphayim
 * @Date: 2021-03-26 14:52:12
 * @Description: 异常路由
 */

export const exceptionRouteNames = {
  403: 'Exception403',
  404: 'Exception404',
  500: 'Exception500',
}

export default [
  {
    path: '/e403',
    name: exceptionRouteNames[403],
    component: () => import(/* webpackChunkName: "exception" */ './403'),
    meta: { title: '拒绝访问' },
  },
  {
    path: '/e404',
    name: exceptionRouteNames[404],
    component: () => import(/* webpackChunkName: "exception" */ './404'),
    meta: { title: '找不到页面' },
  },
  {
    path: '/e500',
    name: exceptionRouteNames[500],
    component: () => import(/* webpackChunkName: "exception" */ './500'),
    meta: { title: '服务异常' },
  },
]
