/*
 * @Author: Cphayim
 * @Date: 2019-07-09 09:56:25
 * @Description: 响应体转换拦截器
 */

import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { SuccessResponseBody } from '@/libs/response'

/**
 * 全局响应拦截器
 * 对控制器返回的响应（非异常）数据进行包装
 * @export
 * @class ResponseInterceptor
 * @implements {NestInterceptor<T, SuccessResponseBody<T>>}
 * @template T
 */
export class ResponseInterceptor<T> implements NestInterceptor<T, SuccessResponseBody<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<SuccessResponseBody<T>> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    res.status(HttpStatus.OK)
    return next.handle().pipe(
      map(
        (data) =>
          new SuccessResponseBody({
            data,
            request: `${req.method} ${req.path}`,
          }),
      ),
    )
  }
}
