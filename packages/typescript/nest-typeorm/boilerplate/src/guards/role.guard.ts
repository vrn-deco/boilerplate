/*
 * @Author: Cphayim
 * @Date: 2019-08-23 08:49:52
 * @LastEditTime: 2022-03-31 13:55:16
 * @Description: 角色验证守卫
 */
import { CanActivate, Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { UserRole, UserEntity, getUserRoleLabel } from '@/database/entities/user.entity'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: UserRole) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user: UserEntity = request.user
    // 如果用户角色低于要求的角色则拒绝访问
    if (user.role < this.role) {
      throw new ForbiddenException(
        `"${getUserRoleLabel(user.role)}"角色不能访问"${getUserRoleLabel(this.role)}"角色的服务`,
      )
    }
    return true
  }
}
