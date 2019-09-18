/*
 * @Author: Cphayim
 * @Date: 2019-09-04 15:22:14
 * @LastEditTime: 2019-09-06 11:20:12
 * @Description: 网络请求
 */
import Axios, { AxiosRequestConfig } from 'axios'
import { bindResponseInterceptors, ResponseBody } from './response'
import { bindRequestInterceptors } from './request'

// 安全的 fetch
export const safeFetch = createSafeFetch()
// 不安全的 fetch，需要自己处理各种异常
export const unSafeFetch = Axios.create()

function createSafeFetch() {
  const instance = Axios.create()

  // 任何响应状态码都放行，由拦截器处理
  instance.defaults.validateStatus = status => true

  bindRequestInterceptors(instance)
  bindResponseInterceptors(instance)

  return async function safeFetch<T>(
    config: AxiosRequestConfig,
    { redirectAt401 = true } = {},
  ): Promise<ResponseBody<T>> {
    const axiosResponse = await instance.request<ResponseBody<T>>(config)

    return axiosResponse.data
  }
}
