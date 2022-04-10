/*
 * @Author: Cphayim
 * @Date: 2019-07-08 13:18:15
 * @Description: 响应状态码枚举 和 响应结构类
 */
import { HttpStatus } from '@nestjs/common'
import dayjs from 'dayjs'

/**
 * 响应状态码枚举
 */
export enum ResCode {
  // 成功
  OK = 0,
  // 参数错误
  BAD_REQUEST = HttpStatus.BAD_REQUEST,
  // 未授权
  UNAUTHORIZED = HttpStatus.UNAUTHORIZED,
  // 拒绝
  FORBIDDEN = HttpStatus.FORBIDDEN,
  // 找不到资源
  NOT_FOUND = HttpStatus.NOT_FOUND,
  // 服务端错误
  SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
  // 正在维护
  MAINTENANCE = HttpStatus.SERVICE_UNAVAILABLE,
}

/**
 * 响应体结构类
 */
export class ResponseBody<T> {
  // 状态码
  readonly code: ResCode
  // 响应消息
  readonly message: any
  // 响应数据
  readonly data: T
  // 请求方法+请求路径
  readonly request: string
  // ISO 时间戳
  readonly timestamp: string

  constructor({ code = ResCode.SERVER_ERROR, message = 'INTERNAL_SERVER_ERROR', data = null, request = '' } = {}) {
    this.code = code
    this.message = message
    this.data = data
    this.request = request || 'unknown'
    this.timestamp = dayjs().format()
  }
}

/**
 * 成功响应体结构类
 * @export
 * @class SuccessResponseBody
 * @extends {ResponseBody}
 * @template T
 */
export class SuccessResponseBody<T> extends ResponseBody<T> {
  constructor({ code = ResCode.OK, message = 'ok', request, data }) {
    super({ code, message, request, data })
  }
}
