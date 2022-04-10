/*
 * @Author: Cphayim
 * @Date: 2020-11-03 14:32:00
 * @Description: 配置中心
 */
import { createAppConfig } from './app.config'
import { createMySqlConfig } from './mysql.config'
import { createRedisConfig } from './redis.config'
import { loadEnv } from './utils'

// 当前应用是否运行在 docker 容器中
const isInDocker = !!process.env.DOCKER_ENV

// docker 容器已经默认载入 .env 文件
// 如果在非容器环境中首先加载 .env 文件读取环境变量
if (!isInDocker) loadEnv()

export const config = {
  docker: isInDocker,
  app: createAppConfig(),
  mysql: createMySqlConfig(),
  redis: createRedisConfig(),
} as const
