/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:37:31
 * @LastEditTime: 2020-07-19 19:45:29
 * @Description:
 */
import store from '@/store'
import { authorizationFormat } from '@/utils/helpers'
import config from '@/config'

export const defaultRequest = configHearder => {
  // 这里注册你的请求拦截
  normal(configHearder)
}

export const defaultRequestError = error => {
  normalError(error)
}

function normal(configHearder) {
  // 从 store 中获取 token
  const token = store.getters['auth/token']
  // token 存在且请求头中没有 Authorization 字段时添加
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = authorizationFormat(token)
  }
  return config
}

function normalError(error) {
  const errorInfo = error.data.error ? error.data.error.message : error.data
  return Promise.reject(errorInfo)
}
