/*
 * @Author: Cphayim
 * @Date: 2020-11-04 17:06:28
 * @Description: 数据库连接选项
 */

// import { RedisModuleOptions } from 'nestjs-redis'

import { config } from '@/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import path from 'path'

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.mysql.HOST,
  port: config.mysql.PORT,
  username: config.mysql.USER,
  password: config.mysql.PASSWORD,
  database: config.mysql.DATABASE,
  //  logging: false,
  // 扫描所有实体文件
  entities: [path.join(__dirname, 'entities', '*.entity.{ts,js}')],
  retryAttempts: 20, // 重连次数
  retryDelay: 3000, // 重连延迟
  synchronize: false,
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
}

// export const redisOptions: RedisModuleOptions = {
//   host: config.redis.HOST,
//   port: config.redis.PORT,
//   db: 0,
// }
