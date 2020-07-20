/*
 * @Author: Cphayim
 * @Date: 2019-09-06 09:27:55
 * @LastEditTime: 2020-07-17 16:49:42
 * @Description: 响应拦截器
 */
import { AxiosInstance, AxiosResponse } from 'axios'
import { push } from 'connected-react-router'

import config from '@/config'
import { store } from '@/store'
import { ResBody } from '@/models/res-body'
import { BindSelf } from '@/utils/decorators'

/**
 * 绑定响应拦截器
 */
export const bindResponseInterceptors = (
  instance: AxiosInstance,
  interceptors: ResponseInterceptor[],
) => {
  interceptors.forEach((interceptor) => {
    instance.interceptors.response.use(interceptor.fulfill, interceptor.reject)
  })
}

/**
 * 响应拦截器抽象类
 */
export abstract class ResponseInterceptor<T = any> {
  abstract fulfill(response: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>>
  abstract reject(error: any): any
}

/**
 * resBody 检查拦截器
 */
export class ResBodyInterceptor extends ResponseInterceptor<ResBody> {
  @BindSelf
  fulfill(
    response: AxiosResponse<ResBody>,
  ): AxiosResponse<ResBody> | Promise<AxiosResponse<ResBody>> {
    this.passOrThrow(response)
    return response
  }

  @BindSelf
  reject(error: any) {
    throw error
  }

  private passOrThrow(response: AxiosResponse<ResBody>) {
    const resBody: ResBody = response.data
    if (resBody.code === undefined) {
      // 服务端没有按照结构返回响应
      if (process.env.NODE_ENV !== 'production') {
        throw new TypeError(`服务端返回的响应数据是不合规的 ResBody 类型: ${resBody}`)
      } else {
        throw new Error('网络异常')
      }
    }
  }
}

/**
 * resBody.code 检查拦截器
 */
export class ResCodeInterceptor extends ResponseInterceptor<ResBody> {
  @BindSelf
  fulfill(
    response: AxiosResponse<ResBody>,
  ): AxiosResponse<ResBody> | Promise<AxiosResponse<ResBody>> {
    this.passOrThorw(response)
    return response
  }

  @BindSelf
  reject(error: any) {
    throw error
  }

  private passOrThorw(response: AxiosResponse<ResBody>) {
    const resBody: ResBody = response.data

    const { OK, UNAUTHORIZED, SERVER_ERROR, MAINTENANCE } = config.SERVICES.RESPONSE_CODE
    switch (resBody.code) {
      case OK: // 成功的响应
        return

      case UNAUTHORIZED: // 未认证或 token 过期
        // 当 config.UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到指定页面（如登录页）
        if (config.SERVICES.UNAUTHORIZED_REDIRECT_PATH) {
          store.dispatch(push(config.SERVICES.UNAUTHORIZED_REDIRECT_PATH))
        }
        // 抛出异常中断外部后续逻辑，防止后续代码出错
        throw new Error(resBody.msg)

      case MAINTENANCE:
      case SERVER_ERROR:
        throw new Error(resBody.msg)

      default:
        throw new Error(resBody.msg)
    }
  }
}
