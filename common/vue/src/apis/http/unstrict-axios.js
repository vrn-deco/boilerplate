/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-09-04 15:43:30
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
  // 任何响应状态码都放行，放心很不严谨
  validateStatus: status => true
}

const Axios = axios.create(DEFAULT_OPTIONS)

export default Axios

export * from './axiosConfig'
