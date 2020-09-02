/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:37:31
 * @LastEditTime: 2020-09-03 01:53:34
 * @Description:
 */
import store from '@/store'
import { authorizationFormat } from '@/utils/helpers'

/**
 * 默认的请求拦截
 * @param {*} configHearder
 */
export function normal(configHearder) {
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
export function normalError(error) {
  const errorInfo = error.data.error ? error.data.error.message : error.data
  return Promise.reject(errorInfo)
}
