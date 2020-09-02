/*
 * @Author: benaozhi
 * @Date: 2020-07-19 17:27:03
 * @LastEditTime: 2020-09-03 01:27:11
 * @Description:
 */
import { normal } from './default'

export const responseInterceptors = Axios => {
  // 这里注册你设置的返回方法
  Axios.interceptors.response.use(normal)
}
