/*
 * @Author: Cphayim
 * @Date: 2019-07-08 16:11:03
 * @LastEditTime: 2019-07-09 10:47:43
 * @Description: 角色装饰器
 */
import { SetMetadata } from '@nestjs/common'

export function Roles(...roles: string[]) {
  return SetMetadata('roles', roles)
}
