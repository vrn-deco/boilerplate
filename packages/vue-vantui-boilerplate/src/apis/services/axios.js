/*
 * @Author: Aozhi
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime : 2020-01-03 18:47:06
 * @Description:
 */

import axios from 'axios'

import store from '@/store'
import { authorizationFormat, Toast } from '@/utils'
import router from '@/router'

// import{ codeMessage } from'@/utils/code-message'

const isDev = process.env.NODE_ENV === 'development'
// 从暴露的全局配置中获取当前环境对应的配置对象
const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']

const DEFAULT_OPTIONS = {
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
}

const Axios = axios.create(DEFAULT_OPTIONS)

/**
 * 请求时的拦截
 */
Axios.interceptors.request.use(
  config => {
    const token = store.getters['auth/token']
    // token 存在且请求头中没有 Authorization 字段时添加
    if(token && !config.headers.Authorization) {
      config.headers.Authorization = authorizationFormat(token)
    }
    return config
  },
  error => {
    // 当请求异常时做一些处理
    Toast.clear()
    const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

/**
 * 响应时拦截
 */
Axios.interceptors.response.use(
  response => {
    // 返回响应时做一些统一处理
    if(response.data.status === 10002) {
      // netintech.msg(codeMessages['10002'] + ':' + response.data.desc)
    } else if(response.data.status === 10004) {
      // netintech.msg(codeMessages['10004'])
      // TODO token 过期
      return router.push('/')
    } else {
      return response.data
    }
  },
  error => {
    console.error(error)
  }
)

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
    if(!url) {
      throw new RangeError('缺少 url 参数')
    }
    // 如果没有传入 baseURL 使用 GLOBAL_CONFIG 对应当前环境的 DEFAULT 配置
    this.baseURL = baseURL || globalConfig.BASE_URL_MAP.DEFAULT
    this.url = url
    this.method = method
    this.headers = headers
    if(this.method === 'GET') {
      this.params = data
    } else {
      this.data = data
    }
  }
}
