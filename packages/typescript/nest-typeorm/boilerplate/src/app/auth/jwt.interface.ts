/*
 * @Author: Cphayim
 * @Date: 2019-08-20 10:01:14
 * @LastEditTime: 2022-03-31 16:04:26
 * @Description: JWT 载荷接口
 */
// import { UserRole } from '@/database/entities/user.entity'

export interface JwtPayload {
  uid: number
  // role: UserRole
}
