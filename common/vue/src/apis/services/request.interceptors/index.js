/*
 * @Author: benaozhi
 * @Date: 2020-07-19 17:26:58
 * @LastEditTime: 2020-09-03 01:37:48
 * @Description:
 */
import { normal, normalError } from './default'
export const requestInterceptors = Axios => {
  // 这里注册你的请求拦截(成功操作)
  Axios.interceptors.request.use(normal, normalError)
}
