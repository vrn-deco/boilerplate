/*
 * @Author: Cphayim
 * @Date: 2019-09-06 09:27:55
 * @LastEditTime: 2019-09-06 10:55:49
 * @Description: 响应结构及拦截器
 */
import { AxiosInstance, AxiosResponse } from 'axios'

export interface ResponseBody<T = any> {
  // 请求方法+请求路径
  readonly request: string
  // HTTP 状态码
  readonly status: number
  // 响应状态码
  // readonly code: number
  // 响应消息
  readonly message: any
  // ISO 时间戳
  readonly timestamp: string
  // 响应数据
  readonly result: T
}

export function bindResponseInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(responsePolicy, (error) => {
    console.log(error)
  })
}

function responsePolicy(axiosResponse: AxiosResponse<ResponseBody>): AxiosResponse<ResponseBody> {
  console.log(axiosResponse)
  // 5XX 处理
  if (axiosResponse.status >= 500) {
    console.error('服务器端错误')
  }
  // TODO 404 处理
  // TODO 401 处理
  else if(axiosResponse.status === 401) {
    console.error('未授权的操作')
  }
  // TODO 403 处理
  return axiosResponse
}
