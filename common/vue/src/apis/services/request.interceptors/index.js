/*
 * @Author: benaozhi
 * @Date: 2020-07-19 17:26:58
 * @LastEditTime: 2020-07-19 19:42:40
 * @Description:
 */
import { defaultRequest, defaultRequestError } from './default'
export const requestInterceptors = config => {
  // 这里注册你的请求拦截(成功操作)
  defaultRequest(config)
}

export const requestInterceptorsError = (config, error) => {
  // 这里注册你的请求拦截(失败操作)
  defaultRequestError(error)
}
