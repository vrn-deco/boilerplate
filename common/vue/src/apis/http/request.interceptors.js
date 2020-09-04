/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:37:31
 * @LastEditTime: 2020-09-04 14:55:14
 * @Description:
 */
import store from '@/store'
import { authorizationFormat } from '@/utils/helpers'

export const requestInterceptors = Axios => {
  // 这里注册你的请求拦截(成功操作)
  Axios.interceptors.request.use(normal, normalError)
}

/**
 * 默认的请求拦截
 * @param {*} configHearder
 */
function normal(configHearder) {
  // 从 store 中获取 token
  const token = store.getters['auth/token']
  // token 存在且请求头中没有 Authorization 字段时添加
  if (token && !configHearder.headers.Authorization) {
    configHearder.headers.Authorization = authorizationFormat(token)
  }
  return configHearder
}

/**
 * 默认的请求拦截错误
 * @param {*} error
 */
function normalError(error) {
  const errorInfo = error.data.error ? error.data.error.message : error.data
  return Promise.reject(errorInfo)
}
