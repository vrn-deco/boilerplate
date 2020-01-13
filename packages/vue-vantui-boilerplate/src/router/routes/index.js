/*
 * @Author: benaozhi
 * @Date: 2020-01-07 10:46:43
 * @LastEditTime : 2020-01-13 15:23:47
 * @Description: 导出所有路由
 */
import demo from './demo.routes'
import err from './error.routes'

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
  ...err
]
