/*
 * @Author: Cphayim
 * @Date: 2020-12-23 11:13:12
 * @Description: Swagger API 接口文档
 */
import { NestExpressApplication } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiOperation, DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { config } from '@/config'
import { getUserRoleLabel, UserRole } from '@/database/entities/user.entity'

export function buildSwaggerDocument(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle(`API Documentation`)
    .setVersion(`${config.app.VERSION}`)
    .setDescription(`接口文档`)
    .addBearerAuth({ type: 'apiKey', name: 'Authorization' })
    .build()
  const doc = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/doc', app, doc)
}

interface ApiBaseInfoOptions {
  /**
   * @property 标题
   */
  readonly title?: string
  /**
   * @property 描述
   */
  readonly description?: string
  /**
   * @property 是否废弃
   */
  readonly deprecated?: boolean
  /**
   * @property 角色要求
   */
  readonly role?: UserRole
  /**
   * @property 是否需要认证（如果设置了 `role` 角色要求，则 `authorization` 始终为 `true`）
   */
  readonly authorization?: boolean
}

/**
 * Swagger API 文档的控制器方法基本信息描述装饰器
 *
 * 合并 `ApiOperation` 和 `ApiBearerAuth` 装饰器
 * @typedef 方法装饰器
 */
export function ApiBaseInfo({
  title = '',
  role,
  description = '',
  deprecated = false,
  authorization = false,
}: ApiBaseInfoOptions): MethodDecorator {
  let concatTitle = title
  // 如果当前 API 需要认证 token 且指定了用户角色要求，在 title 后面拼接 label
  if (role !== undefined) {
    authorization = true
    concatTitle += ` <${getUserRoleLabel(role)}>`
  }
  // 合并 ApiOperation 和 ApiBearerAuth 装饰器
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary: concatTitle, description: description || concatTitle, deprecated })(
      target,
      propertyKey,
      descriptor,
    )
    if (authorization) {
      ApiBearerAuth()(target, propertyKey, descriptor)
    }
  }
}
