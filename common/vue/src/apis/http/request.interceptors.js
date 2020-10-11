/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:37:31
 * @LastEditTime: 2020-10-11 18:31:50
 * @Description:
 */
import store from '@/store'
import { authorizationFormat } from '@/utils/helpers'

export const registerRequestInterceptors = axiosInstance => {
  // 这里注册你的请求拦截(成功操作)
  axiosInstance.interceptors.request.use(authorize, handleError)
}

/**
 * 请求拦截器
 * 前置操作：添加 token 到 header
 * @param {*} requestConfig
 */
function authorize(requestConfig) {
  // 从 store 中获取 token
  const token = store.getters['auth/token']
  // token 存在且请求头中没有 Authorization 字段时添加
  if (token && !requestConfig.headers.Authorization) {
    requestConfig.headers.Authorization = authorizationFormat(token)
  }
  return requestConfig
}

/**
 * 默认的请求拦截错误
 * @param {*} error
 */
function handleError(error) {
  const errorInfo = error.data.error ? error.data.error.message : error.data
  return Promise.reject(errorInfo)
}
