/*
 * @Author: Cphayim
 * @Date: 2019-07-06 16:55:14
 * @LastEditTime: 2019-07-10 09:59:57
 * @Description: 根模块
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { typeOrmOptions } from '../libs/db'

import { CatsModule } from './cats/cats.modules'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    // 数据库模块
    TypeOrmModule.forRoot(typeOrmOptions),
    // 子模块
    CatsModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
