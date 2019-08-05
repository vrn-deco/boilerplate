/*
 * @Author: Cphayim
 * @Date: 2019-07-09 14:03:05
 * @LastEditTime: 2019-07-11 13:52:00
 * @Description: 配置文件
 */
import { join } from 'path'
import { config as loadEnv, parse } from 'dotenv'
import { IConfig } from './interface'

const ROOT_PATH = join(__dirname, '..', '..')
const { parsed, error } = loadEnv()

if (error) {
  // .env 文件解析失败
  throw Error(error.message)
}

const config: IConfig = parsed as IConfig

export { config }
