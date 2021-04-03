import { DotenvParseOutput } from 'dotenv'

export interface IConfig extends DotenvParseOutput {
  readonly NODE_ENV: 'development' | 'production'
  // nest 相关
  readonly NEST_LISTEN_PORT: string

  // typeorm 和数据库相关
  readonly MYSQL_HOST: string
  readonly MYSQL_PORT: string
  readonly MYSQL_USERNAME: string
  readonly MYSQL_PASSWORD: string
  readonly MYSQL_DATABASE: string
}
