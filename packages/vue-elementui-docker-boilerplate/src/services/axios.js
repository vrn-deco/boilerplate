/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-03-14 16:30:12
 * @Description: 自定义 axios
 */

import axios from 'axios'

import store from '@/store'
import { authorizationFormat } from '@/utils'
import config from '@/config'
import router from '@/router'

const DEFAULT_OPTIONS = {
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

const Axios = axios.create(DEFAULT_OPTIONS)

/**
 * 请求时的拦截
 */
Axios.interceptors.request.use(
  config => {
    // 从 store 中获取 token
    const token = store.getters['auth/token']
    // token 存在且请求头中没有 Authorization 字段时添加
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = authorizationFormat(token)
    }
    return config
  },
  error => {
    const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  },
)

/**
 * 响应时拦截
 */
Axios.interceptors.response.use(response => {
  if (response.data.code === 10001) {
    return response.data.data
  }
  if (response.data.code === 10004) {
    // TODO token 过期，提交一个 logout action
    router.replace({ path: '/auth/logout' })
    throw new Error(response.data.msg)
  } else {
    throw new Error(response.data.msg)
  }
})

export default Axios

export class AxiosConfig {
  /**
   * @param {Object} options
   * @param {string} [options.baseURL] 协议+主机名，不传递将取当前环境（开发/生产）全局配置下的 BASE_URL_MAP.DEFAULT
   * @param {string} options.url 请求路径
   * @param {Object} [options.data = {}] 请求数据
   * @param {Object} [options.headers = {}] 请求头
   */
  constructor({ baseURL, url, method = 'GET', data = {}, headers = {} } = {}) {
    if (!url) {
      throw new RangeError('缺少 url 参数')
    }
    // 如果没有传入 baseURL 使用 GLOBAL_CONFIG 对应当前环境的 DEFAULT 配置
    this.baseURL = baseURL || config.BASE_URL
    this.url = url
    this.method = method
    this.headers = headers
    if (this.method === 'GET') {
      this.params = data
    } else {
      this.data = data
    }
  }
}
