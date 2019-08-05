/*
 * @Author: Cphayim
 * @Date: 2019-07-08 15:57:09
 * @LastEditTime: 2019-07-09 09:50:42
 * @Description: 角色验证守卫
 */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    console.log(context.getHandler())
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    console.log(roles)
    // if (!roles) {
    //   return true
    // }
    // const request = context.switchToHttp().getRequest()
    // const user = request.user
    // const hasRole = () => user.roles.some(role => roles.includes(role))
    // if (user && user.roles && hasRole()) {
    //   return true
    // }
    // throw new UnauthorizedException()
    return true
  }
}
