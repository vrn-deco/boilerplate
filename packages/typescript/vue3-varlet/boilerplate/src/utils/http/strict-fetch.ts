/*
 * @Author: Cphayim
 * @Description: 严格的 axios 实例，用于请求自己的服务端（能够返回固定格式的）
 */
import Axios, { AxiosRequestConfig } from 'axios'

import config from '@/config'

import { registerRequestInterceptors } from './request.interceptors'
import { registerResponseInterceptors } from './response.interceptors'

const DEFAULT_OPTIONS: AxiosRequestConfig = {
  baseURL: config.SERVER.BASE_URL,
  timeout: 6000,
  responseType: 'json',
  // 跨域请求是否允许带 cookie，开启的话注意后端响应头需要携带 Access-Control-Allow-Credentials: true，且 Access-Control-Allow-Origin 不能为 *
  withCredentials: false,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // 任何 HTTP 状态码都放行，由拦截器处理，
  // 根据自己后端返回决定是否开关
  // 如果业务服务始终返回 200 的 HTTP 状态码，仅通过 code 描述接口状态，请关闭这个选项，因为一旦返回非 200，响应可能是网关层返回的（业务服务挂了）
  // 如果业务服务根据 code 值返回不同的 HTTP 状态码，且需要后续处理的话，请开启这个选项，否则响应可能不会进入拦截器（axios 直接抛出错误）
  // validateStatus: () => true,
}

export const strictFetch = Axios.create(DEFAULT_OPTIONS)

// 添加拦截器
registerRequestInterceptors(strictFetch)
registerResponseInterceptors(strictFetch)
