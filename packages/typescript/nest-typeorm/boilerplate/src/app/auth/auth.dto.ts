/*
 * @Author: Cphayim
 * @Date: 2019-08-22 15:57:25
 * @Description: 认证数据传输对象
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

import { ResponseDTO } from '@/libs/decorator'

@ResponseDTO()
export class AuthTokenDTO {
  @ApiProperty({ description: '令牌' })
  @IsString()
  readonly token: string

  @ApiProperty({ description: '截止时间戳（Unix秒）' })
  @IsNumber()
  readonly expires: number
}
