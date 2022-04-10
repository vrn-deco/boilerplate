import { typeOrmOptions } from '@/database/options'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // 数据库连接模块
    TypeOrmModule.forRoot(typeOrmOptions),
    AuthModule,
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
