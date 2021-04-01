/*
 * @Author: Cphayim
 * @Date: 2019-07-09 09:56:25
 * @LastEditTime: 2019-07-09 10:54:02
 * @Description: 响应体转换拦截器
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SuccessResponseBody } from '../libs/struct'

/**
 * 全局响应拦截器
 * 对控制器返回的响应（非异常）数据进行包装
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor<T, SuccessResponseBody<T>>}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponseBody<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseBody<T>> {
    const req = context.switchToHttp().getRequest()
    return next.handle().pipe(map(data => new SuccessResponseBody({ data, request: `${req.method} ${req.url}` })))
  }
}
