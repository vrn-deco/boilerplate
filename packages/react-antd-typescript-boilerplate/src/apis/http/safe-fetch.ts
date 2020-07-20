/*
 * @Author: Cphayim
 * @Date: 2020-07-16 17:14:52
 * @LastEditTime: 2020-07-20 16:06:27
 * @Description: 严格的 http 请求工具
 * （用于请求自己的后端业务接口，需保证有唯一的返回结构<ResBody>）
 */

import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

import config from '@/config'

import {
  bindRequestInterceptors,
  RequestInterceptor,
  AuthRequestInterceptor,
} from './request.interceptors'
import {
  ResBodyInterceptor,
  ResCodeInterceptor,
  bindResponseInterceptors,
  ResponseInterceptor,
} from './response.interceptors'

// 使用的请求拦截器
const requestInterceptors: Array<RequestInterceptor> = [new AuthRequestInterceptor()]
// 使用的响应拦截器
const responseInterceptors: Array<ResponseInterceptor> = [
  new ResBodyInterceptor(),
  new ResCodeInterceptor(),
]

const defaultOptions: AxiosRequestConfig = {
  baseURL: config.SERVICES.BASE_URL,
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

function createSafeFetch(): AxiosInstance {
  const instance = Axios.create(defaultOptions)
  // 任何响应状态码都放行，由拦截器处理
  instance.defaults.validateStatus = (status) => true
  // 绑定拦截器
  bindRequestInterceptors(instance, requestInterceptors)
  bindResponseInterceptors(instance, responseInterceptors)

  return instance
}

export const safeFetch = createSafeFetch()
