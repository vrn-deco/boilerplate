/*
 * @Author: Cphayim
 * @Date: 2019-07-08 13:45:37
 * @LastEditTime: 2019-07-09 10:40:08
 * @Description: 全局请求参数校验管道
 */
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

/**
 * 全局请求参数校验管道
 * @export
 * @class ValidationPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // metatype 表示当前值的元类型，可能是 JS 原生类型或自定义类型（类）
    const { metatype } = metadata
    // 如果是原生类型，直接返回
    if (!metatype || this.isNativeType(metatype)) {
      return value
    }
    // 将对象转为类实例
    const obj = plainToClass(metatype, value)
    const errors = await validate(obj)
    if (errors.length) {
      throw new BadRequestException(errors)
    }
    return value
  }

  /**
   * 是否是原生 JS 类型
   * @param metatype
   */
  private isNativeType(metatype): boolean {
    const types = [Number, Boolean, String, Array, Object]
    return Boolean(types.find(type => metatype === type))
  }
}
