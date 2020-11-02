/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-11-02 17:23:08
 * @Description: 严格的 axios 实例，用于请求自己的服务端（能够返回固定格式的）
 */

import Axios from 'axios'

import config from '@/config'

import { registerRequestInterceptors } from './request.interceptors'
import { registerResponseInterceptors } from './response.interceptors'

const DEFAULT_OPTIONS = {
  baseURL: config.SERVICES.BASE_URL,
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // 任何响应状态码都放行，由拦截器处理
  validateStatus: status => true,
}

export const strictFetch = Axios.create(DEFAULT_OPTIONS)

/**
 * 请求时的拦截
 */
registerRequestInterceptors(strictFetch)

/**
 * 响应时拦截
 */
registerResponseInterceptors(strictFetch)
