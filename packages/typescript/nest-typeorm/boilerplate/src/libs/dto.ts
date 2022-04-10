/*
 * @Author: Cphayim
 * @Date: 2021-08-04 14:18:56
 * @Description: 公共 DTO
 */

import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { RequestDTO, ResponseDTO } from './decorator'

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@RequestDTO()
export class ListQueryConditionDTO {
  @ApiProperty({ description: '排序方式（由具体业务决定根据哪个字段排序）' })
  @IsEnum(Order)
  @IsOptional()
  order: Order = Order.ASC

  @ApiProperty({ description: '页码' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  current = 1

  @ApiProperty({ description: '条数' })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  size = 10

  @ApiProperty({ description: '关键字（由具体业务决定匹配哪些字段）' })
  @IsString()
  @IsOptional()
  keyword = ''
}

@ResponseDTO()
export class ListQueryResultDTO<T> {
  @ApiProperty({ description: '页码' })
  pageNumber: number

  @ApiProperty({ description: '条数' })
  pageSize: number

  @ApiProperty({ description: '总条数' })
  total: number

  @ApiProperty({ description: '数据' })
  list: T[]
}

@RequestDTO()
export class IdDTO {
  @ApiProperty({ description: 'id' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  id: number
}

@RequestDTO()
export class IdOptionalDTO {
  @ApiProperty({ description: 'id' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  id: number
}
