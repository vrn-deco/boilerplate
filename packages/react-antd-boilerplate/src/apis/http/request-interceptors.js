/*
 * @Autor: yugeStrive
 * @Date: 2020-07-29 14:48:39
 * @LastEditTime: 2020-08-07 17:09:26
 * @Description: 请求拦截处理
 */

import { Auth } from '@/utils/auth'

export const registerRequestInterceptor = (Axios) => {
  Axios.interceptors.request.use(
    (request) => {
      // 获取token
      const token = Auth.token
      if (token && !request.headers.Authorization) {
        request.headers.Authorization = token
      }
      return request
    },
    (error) => {
      const errorInfo = error.data.error ? error.data.error.message : error.data
      return Promise.reject(errorInfo)
    }
  )
}
