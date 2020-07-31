/*
 * @Autor: yugeStrive
 * @Date: 2020-07-29 14:45:29
 * @LastEditTime: 2020-07-31 14:07:19
 * @Description: 本框架自定义请求规则，为规范请求
 */

import axios from 'axios'
import { registerRequestInterceptor } from './request-interceptors'
import { registerResponseInterceptor } from './response-interceptors'
import config from '@/config'

const DEFAULT_OPTIONS = {
  baseURL: config.SERVICES.BASE_URL,
  timeout: 3000,
  responseType: 'json',
  withCredentials: false, // 是否允许携带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

function createStrictFetch() {
  const Axios = axios.create(DEFAULT_OPTIONS)
  registerRequestInterceptor(Axios)
  registerResponseInterceptor(Axios)
  return Axios
}

export const strictFetch = createStrictFetch()
