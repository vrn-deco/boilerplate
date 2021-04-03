/*
 * @Author: Cphayim
 * @Date: 2019-07-08 10:40:54
 * @LastEditTime: 2019-07-15 15:50:05
 * @Description: 全局异常处理过滤器
 */

import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { ResponseBody } from '../libs/struct'

/**
 * 全局异常处理规律器
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获应用范围内的所有异常，返回标准响应
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req: Request = ctx.getRequest()
    const res: Response = ctx.getResponse()
    console.log(exception)
    if (exception instanceof HttpException) {
      // 处理自定义（已知）异常
      handleCustomException(exception, req, res)
    } else {
      // 处理未知异常
      handleUnknownException(req, res)
    }
  }
}

/**
 * 处理已知异常，返回标准响应
 * @param {HttpException} exception
 * @param {Request} req
 * @param {Response} res
 */
function handleCustomException(exception: HttpException, req: Request, res: Response) {
  const status = exception.getStatus()
  const message = getExceptionMessage(exception)
  const responseBody = new ResponseBody({
    status,
    message,
    request: `${req.method} ${req.url}`,
  })
  res.status(status).json(responseBody)
}

/**
 * 处理未知异常，返回标准响应
 * @param {Request} req
 * @param {Response} res
 */
function handleUnknownException(req: Request, res: Response) {
  // 默认参数就是 500 错误
  const responseBody = new ResponseBody({
    request: `${req.method} ${req.url}`,
  })
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody)
}

/**
 * 获取响应消息
 * @param exception
 */
function getExceptionMessage(exception: HttpException): any {
  const response: any = exception.getResponse()
  // 抛出的异常有自定义 message 返回 message，否则返回默认 error 基础描述
  return response && response.message ? response.message : response.error
}
