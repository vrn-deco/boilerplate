/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-05-27 10:36:46
 * @Description: 自定义 axios
 */

import axios from 'axios'

import store from '@/store'
import { authorizationFormat } from '@/utils/helpers'
import config from '@/config'
import router from '@/router/index1'

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
  const res = response.data
  const code = res[config.RESPONSE_CODE_FILED]

  if (code === config.RESPONSE_CODE.OK) {
    // 成功，直接返回 data
    return res[config.RESPONSE_DATA_FILED]
  } else if (code === config.RESPONSE_CODE.UNAUTHORIZED) {
    // token 过期或未登录
    // 当 config.UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到登录页
    if (config.UNAUTHORIZED_REDIRECT_PATH) {
      router.replace({ path: config.UNAUTHORIZED_REDIRECT_PATH })
    }
    // 抛出异常中断外部后续逻辑
    throw new Error(res[config.RESPONSE_MESSAGE_FILED])
  } else {
    // 其它 code，抛出异常
    throw new Error(res[config.RESPONSE_MESSAGE_FILED])
  }
})

export default Axios

export class AxiosConfig {
  /**
   * @param {Object} options
   * @param {string} [options.baseURL] 协议+主机名+端口号，不传递将取当前环境（开发/生产）配置下的 BASE_URL
   * @param {string} options.url 请求路径
   * @param {Object} [options.data = {}] 请求数据
   * @param {Object} [options.headers = {}] 请求头
   * @param {string} [options.responseType = 'json'] 服务端返回的数据类型，默认为 json
   */
  constructor({
    baseURL,
    url,
    method = 'GET',
    data = {},
    headers = {},
    responseType = 'json',
  } = {}) {
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
    this.responseType = responseType
  }
}
