/*
 * @Author: Cphayim
 * @Date: 2020-11-05 10:58:56
 * @Description: 用户实体 -> 用户表
 */
import { Column, Entity } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { encryptHashSafe } from '@/libs/crypto'
import { ExcludeToJson } from '@/libs/decorator'

import { MyEntity } from '../base/entity'

// 用户角色
export enum UserRole {
  Prisoner = 0, // 小黑屋成员
  Member = 1, // 成员
  Admin = 90, // 管理员
  SuperAdmin = 99, // 超级管理员
}

type UserRoleLabels = { [key in UserRole]: string }

const userRoleLabels: UserRoleLabels = {
  [UserRole.Prisoner]: '小黑屋成员',
  [UserRole.Member]: '成员',
  [UserRole.Admin]: '管理员',
  [UserRole.SuperAdmin]: '超级管理员',
}

/**
 * 通过枚举值获取标签
 */
export const getUserRoleLabel = (role: UserRole) => userRoleLabels[role] ?? '未知'

/**
 * 支持用户名密码创建和微信登录创建
 * 所有字段都可为空，注意在 DTO 层进行判空操作防止脏数据进入
 */
@Entity({
  name: 'users',
  orderBy: { id: 'ASC' },
})
export class UserEntity extends MyEntity {
  @Column({
    type: 'varchar',
    comment: '用户名',
    length: 32,
    nullable: true,
  })
  @ApiProperty({ description: '用户名' })
  username: string

  @Column({
    comment: '密码',
    length: 32,
    nullable: true,
    // 转换器
    transformer: {
      // 从数据库到程序时的转换
      from: (val: string): string => val,
      // 从程序到数据库时的转换（执行加盐MD5）
      to: (val: string): string => encryptHashSafe({ data: val }),
    },
  })
  @ApiProperty({ description: '密码' })
  @ExcludeToJson() // jsonify 时排除该属性
  password: string

  @Column({
    type: 'varchar',
    comment: '昵称',
    length: 64,
    nullable: true,
  })
  @ApiProperty({ description: '昵称' })
  nickname: string

  @Column({
    type: 'varchar',
    comment: '头像',
    length: 512,
    nullable: true,
  })
  @ApiProperty({ description: '头像' })
  avatar: string

  @Column({
    type: 'enum',
    comment: '角色',
    enum: UserRole,
    default: UserRole.Member,
  })
  @ApiProperty({ description: '角色', example: UserRole.Member })
  role: UserRole

  @Column({
    name: 'refresh_token',
    comment: '刷新令牌',
    nullable: true,
  })
  @ApiProperty({ description: '刷新令牌' })
  @ExcludeToJson()
  refreshToken: string // 根据需要使用，默认未实现

  @Column({
    name: 'last_login_time',
    type: 'datetime',
    comment: '最后登录时间',
    nullable: true,
  })
  @ApiProperty({ description: '最后登录时间' })
  lastLoginTime: Date
}
