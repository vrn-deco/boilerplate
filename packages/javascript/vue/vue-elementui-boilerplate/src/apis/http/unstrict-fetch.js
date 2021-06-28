/*
 * @Author: Cphayim
 * @Date: 2019-05-12 22:48:53
 * @LastEditTime: 2020-10-21 09:49:45
 * @Description: 非严格的 axios 实例，不含拦截器逻辑（用于请求第三方服务，即无法返回固定格式的）
 */

import Axios from 'axios'

const DEFAULT_OPTIONS = {
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

export const unstrictFetch = Axios.create(DEFAULT_OPTIONS)
