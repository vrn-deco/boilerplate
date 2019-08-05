/*
 * @Author: Cphayim
 * @Date: 2019-07-08 15:46:08
 * @LastEditTime: 2019-07-09 08:58:11
 * @Description: 授权验证守卫
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    console.log(context.getHandler())
    // return validateRequest(req)
    return true
  }
}
