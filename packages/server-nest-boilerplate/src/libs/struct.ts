/*
 * @Author: Cphayim
 * @Date: 2019-07-08 13:18:15
 * @LastEditTime: 2019-07-09 10:51:36
 * @Description: 结构类
 */
// tslint:disable: max-classes-per-file
import { HttpStatus } from '@nestjs/common'

/**
 * 响应体结构类
 * @export
 * @class ResponseBody
 */
export class ResponseBody {
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
  constructor({ status = HttpStatus.INTERNAL_SERVER_ERROR, message = 'Internal server error', request = '' } = {}) {
    this.status = status
    this.message = message
    this.request = request || 'unknown'
    this.timestamp = new Date().toISOString()
  }
}

/**
 * 成功响应体结构类
 * @export
 * @class SuccessResponseBody
 * @extends {ResponseBody}
 * @template T
 */
export class SuccessResponseBody<T> extends ResponseBody {
  // 响应数据
  readonly data: T
  constructor({ request, data }) {
    super({ status: HttpStatus.OK, message: 'OK', request })
    this.data = data
  }
}
