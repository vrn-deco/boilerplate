/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-09-04 14:53:36
 * @Description: 自定义 axios
 */

import axios from 'axios'

import { requestInterceptors } from './request.interceptors'
import { responseInterceptors } from './response.interceptors'

const DEFAULT_OPTIONS = {
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

const Axios = axios.create(DEFAULT_OPTIONS)

/**
 * 请求时的拦截
 */
requestInterceptors(axios)

/**
 * 响应时拦截
 */
responseInterceptors(axios)

export default Axios

export * from './axiosConfig'
