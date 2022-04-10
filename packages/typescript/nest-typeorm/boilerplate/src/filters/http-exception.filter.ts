/*
 * @Author: Cphayim
 * @Date: 2019-07-08 10:40:54
 * @Description: 全局异常处理过滤器
 */
import { Request, Response } from 'express'
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, Logger } from '@nestjs/common'

import { ResCode, ResponseBody } from '@/libs/response'
import { CustomHttpException } from '@/libs/exception'

/**
 * 全局异常处理过滤器
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获应用范围内的所有异常，返回标准响应
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req: Request = ctx.getRequest()
    const res: Response = ctx.getResponse()
    if (exception instanceof HttpException) {
      Logger.warn('Known Exception')
      Logger.warn(exception.getResponse())
      // 处理自定义（已知）异常
      handleCustomException(exception, req, res)
    } else {
      Logger.error('Unknown Exception')
      Logger.error(exception.stack)
      // 处理未知异常
      handleUnknownException(req, res)
    }
  }
}

/**
 * 处理已知异常，返回标准响应
 */
function handleCustomException(exception: HttpException, req: Request, res: Response) {
  // code 可能为业务错误 code 或 http 状态码
  const code = exception instanceof CustomHttpException ? exception.code : exception.getStatus()
  const message = getExceptionMessage(exception)
  const responseBody = new ResponseBody({
    code,
    message,
    request: `${req.method} ${req.path}`,
  })
  res.status(exception.getStatus()).json(responseBody)
}

/**
 * 处理未知异常，返回标准响应
 */
function handleUnknownException(req: Request, res: Response) {
  // 默认参数就是 500 错误
  const responseBody = new ResponseBody({
    request: `${req.method} ${req.path}`,
    message: 'Server unknown exception',
  })
  // 返回 500
  res.status(ResCode.SERVER_ERROR).json(responseBody)
}

/**
 * 获取响应消息
 */
function getExceptionMessage(exception: HttpException): string {
  const response: any = exception.getResponse()
  // 抛出的异常有自定义 message 返回 message，否则返回默认 error 基础描述
  return response.message ? response.message : response.error
}
