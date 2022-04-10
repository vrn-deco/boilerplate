/*
 * @Author: Cphayim
 * @Date: 2021-05-23 16:00:58
 * @Description: 用户 DTO
 */
import { UserRole } from '@/database/entities/user.entity'
import { RequestDTO } from '@/libs/decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'

// 登录
@RequestDTO()
export class UserLoginDTO {
  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string
}

// 注册
@RequestDTO()
export class UserRegisterDTO extends UserLoginDTO {
  @ApiProperty({ description: '昵称' })
  @IsString()
  nickname: string
}

// 用户角色修改
@RequestDTO()
export class UserChangeRoleDTO {
  @ApiProperty({ description: '角色' })
  @IsEnum(UserRole)
  role: UserRole
}
