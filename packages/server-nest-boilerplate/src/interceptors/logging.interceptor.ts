/*
 * @Author: Cphayim
 * @Date: 2019-07-09 09:48:50
 * @LastEditTime: 2019-07-09 09:56:11
 * @Description: 响应时间输出拦截器
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')

    const now = Date.now()
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
