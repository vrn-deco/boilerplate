// tslint:disable: max-classes-per-file
import { IsString, IsInt, IsOptional } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateCatDto {
  @ApiModelProperty({ description: '名字' })
  @IsString()
  readonly name: string

  @ApiModelProperty({ description: '年龄' })
  @IsInt()
  readonly age: number

  @ApiModelProperty({ description: '品种' })
  @IsString()
  readonly breed: string
}

export class UpdateCatDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiModelProperty()
  @IsInt()
  @IsOptional()
  readonly age: number

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  readonly breed: string
}
