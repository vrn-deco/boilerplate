/*
 * @Author: Cphayim
 * @Date: 2019-07-08 09:43:34
 * @LastEditTime: 2019-07-09 10:39:16
 * @Description: 日志中间件
 */
import { NestMiddleware, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

/**
 * 日志中间件
 * @export
 * @class LoggerMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // TODO: 日志
    next()
  }
}
