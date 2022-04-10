/*
 * @Author: Cphayim
 * @Date: 2020-11-03 14:41:22
 * @Description: MySQL 配置
 */
import { ensureConfig } from './utils'

export type MysqlConfig = ReturnType<typeof createMySqlConfig>

export function createMySqlConfig() {
  const mysqlConfig = {
    /**
     * mysql 主机名
     */
    HOST: process.env.MYSQL_HOST,
    /**
     * mysql 端口号
     */
    PORT: parseInt(process.env.MYSQL_PORT),
    /**
     * mysql 用户名
     */
    USER: process.env.MYSQL_USER,
    /**
     * mysql 密码
     */
    PASSWORD: process.env.MYSQL_PASSWORD,
    /**
     * mysql 数据库名
     */
    DATABASE: process.env.MYSQL_DATABASE,
  } as const
  return ensureConfig(mysqlConfig, 'MySQLConfig')
}
