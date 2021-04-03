/*
 * @Author: Cphayim
 * @Date: 2019-07-09 16:28:58
 * @LastEditTime: 2019-07-11 13:50:53
 * @Description: TypeOrm 数据库配置对象
 */
// tslint:disable: radix
import { join } from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../config'

// 导出数据库配置对象
export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.MYSQL_HOST,
  port: parseInt(config.MYSQL_PORT),
  username: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
}
