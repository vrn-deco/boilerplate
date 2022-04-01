/*
 * @Author: Cphayim
 * @Description: 非严格的 axios 实例，不含拦截器逻辑（用于请求第三方服务，即无法返回固定格式的）
 */
import Axios, { AxiosRequestConfig } from 'axios'

const DEFAULT_OPTIONS: AxiosRequestConfig = {
  timeout: 10000,
  responseType: 'json',
  withCredentials: false, // 是否允许带 cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
}

export const unstrictFetch = Axios.create(DEFAULT_OPTIONS)
