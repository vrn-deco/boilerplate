/*
 * @Author: Cphayim
 * @Date: 2020-11-03 14:41:22
 * @Description: Redis 配置
 */
import { ensureConfig } from './utils'

export type RedisConfig = ReturnType<typeof createRedisConfig>

export function createRedisConfig() {
  const redisConfig = {
    /**
     * redis 主机名
     */
    HOST: process.env.REDIS_HOST,
    /**
     * redis 端口号
     */
    PORT: parseInt(process.env.REDIS_PORT),
  } as const

  return ensureConfig(redisConfig, 'RedisConfig')
}
