/*
 * @Author: Cphayim
 * @Date: 2020-11-03 14:41:10
 * @Description: 应用配置
 */
import path from 'path'
import fs from 'fs-extra'
import { ensureConfig } from './utils'

export type AppConfig = ReturnType<typeof createAppConfig>

const rootDir = path.join(__dirname, '..', '..')
const pkg = fs.readJsonSync(path.join(rootDir, 'package.json'))

export function createAppConfig() {
  const appConfig = {
    /**
     * 项目名称
     */
    NAME: pkg.name,
    /**
     * 版本号
     */
    VERSION: pkg.version,
    /**
     * 是否是开发环境（包含测试环境）
     */
    IS_DEV: process.env.NODE_ENV !== 'production',
    /**
     * 监听的端口号
     */
    PORT: parseInt(process.env.NEST_APP_PORT),
    /**
     * 服务端安全密钥
     */
    SECRET_KEY: process.env.NEST_APP_SECRET_KEY,
    /**
     * TOKEN 有效期 秒
     */
    TOKEN_EXPIRES: 24 * 60 * 60,
    /**
     * 根目录
     */
    ROOT_DIR: rootDir,
    /**
     * 静态资源目录
     */
    STATIC_DIR: path.join(rootDir, 'static'),
    /**
     * 静态资源路由前缀
     */
    STATIC_PREFIX: '/static',
  } as const

  return ensureConfig(appConfig, 'AppConfig')
}
