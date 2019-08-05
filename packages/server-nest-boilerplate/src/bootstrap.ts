/*
 * @Author: Cphayim
 * @Date: 2019-07-12 09:47:06
 * @LastEditTime: 2019-07-12 15:38:27
 * @Description: 启动器
 */
import { NestFactory, NestApplication } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { HttpExceptionFilter } from './filters/http-exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'

import { config } from './config'
import { AppModule } from './app'

// 是否是开发环境
const IS_DEV = config.NODE_ENV === 'development'

/**
 * 应用启动器
 * @export
 * @returns {Promise<NestExpressApplication>}
 */
export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  registerGlobalPlugins(app)
  if (IS_DEV) {
    genSwaggerDocument(app)
  }
  app.listen(config.NEST_LISTEN_PORT)
  return app
}

/**
 * 注册全局插件（过滤器，拦截器，管道）
 * @param {NestApplication | NestExpressApplication} app
 */
function registerGlobalPlugins(app: NestApplication | NestExpressApplication) {
  // 启用 cors
  app.enableCors()
  // 全局异常处理过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 全局响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 全局请求参数验证器
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 校验器将参数对象转为 DTO 类实例
      disableErrorMessages: !IS_DEV, // 开发环境下返回参数错误详情
      whitelist: true, // 仅白名单（去除没有在 dto 中定义的参数字段）
      validationError: { target: false },
    }),
  )
}

/**
 * 生成 Swagger API 文档
 * @param {NestApplication | NestExpressApplication} app
 */
function genSwaggerDocument(app: NestApplication | NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('描述信息')
    .setVersion('v1.0.0')
    .addBearerAuth('Authorization', 'header')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('doc', app, document)
}
