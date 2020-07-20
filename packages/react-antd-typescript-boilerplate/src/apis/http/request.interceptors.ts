/*
 * @Author: Cphayim
 * @Date: 2019-09-06 09:27:50
 * @LastEditTime: 2020-07-20 16:03:24
 * @Description: 请求拦截器
 */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { store } from '@/store'
import { BindSelf } from '@/utils/decorators'
import { authorizationFormat } from '@/utils/helpers'

/**
 * 绑定请求拦截器
 */
export const bindRequestInterceptors = (
  instance: AxiosInstance,
  interceptors: RequestInterceptor[],
) => {
  interceptors.forEach((interceptor) => {
    instance.interceptors.request.use(interceptor.fulfill.bind(interceptor))
  })
}

/**
 * 请求拦截器抽象类
 */
export abstract class RequestInterceptor {
  abstract fulfill(
    requestConfig: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>

  abstract reject(error: any): any
}

/**
 * 认证添加请求拦截器
 * 从 store 中取出 token 添加到请求头
 */
export class AuthRequestInterceptor extends RequestInterceptor {
  @BindSelf
  fulfill(requestConfig: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // 从 store 中获取 token
    const token = store.getState().global.token
    // token 存在且请求头中没有 Authorization 字段时添加
    if (token && !requestConfig.headers.Authorization) {
      requestConfig.headers.Authorization = authorizationFormat(token)
    }
    return requestConfig
  }

  @BindSelf
  reject(error: any) {
    throw error
  }
}
