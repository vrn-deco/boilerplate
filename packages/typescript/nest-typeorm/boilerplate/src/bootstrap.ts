/*
 * @Author: Cphayim
 * @Date: 2020-11-03 13:51:31
 * @Description: 启动器
 */
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

// import { config } from '@/config'
import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { ResponseInterceptor } from '@/interceptors/response.interceptor'
// import { registerExpressExtends } from './plugins/express'
// import { buildSwaggerDocument } from './plugins/swagger'
import { AppModule } from '@/app/app.module'
import { config } from '@/config'

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  registerGlobalExtensions(app)

  await app.listen(config.app.PORT)
  Logger.verbose(`Application is running on: ${await app.getUrl()}`)
}

/**
 * 注册全局扩展（服务->过滤器->拦截器->管道）
 * 注意顺序
 */
function registerGlobalExtensions(app: NestExpressApplication) {
  // 启用 cors
  app.enableCors({ maxAge: 3600 * 24 })

  // 注册 express 扩展
  // registerExpressExtends(app)

  // 启用静态资源服务
  app.useStaticAssets(config.app.STATIC_DIR, {
    prefix: config.app.STATIC_PREFIX,
  })

  // 全局过滤器
  // 异常处理过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 全局响应拦截器
  // 实体字段过滤（通过反射过滤被标记为 ExcludeToJson 的字段）
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  // 响应体转换
  app.useGlobalInterceptors(new ResponseInterceptor())

  // 全局管道
  // 请求参数验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 校验器将参数对象转为对应 DTO 类实例
      transform: true,
      // 非开发环境隐藏参数错误的原因
      disableErrorMessages: !config.app.IS_DEV,
      // 白名单模式，没有在 DTO 中定义的参数将被丢弃
      whitelist: true,
      validationError: {
        // 错误信息中不返回验证参数本身
        target: false,
      },
    }),
  )

  // 开启接口版本控制，注意需要在控制器或方法中指定版本
  // app.enableVersioning({
  //   defaultVersion: '1',
  //   type: VersioningType.URI,
  // })

  // 开发环境生成接口文档
  // if (config.app.IS_DEV) {
  // buildSwaggerDocument(app)
  // }
}
