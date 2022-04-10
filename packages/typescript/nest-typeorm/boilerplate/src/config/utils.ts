/*
 * @Author: Cphayim
 * @Date: 2020-11-03 14:59:46
 * @Description:
 */
import path from 'path'
import { config as load } from 'dotenv'

/**
 * 加载 .env 文件中的环境变量到当前进程
 */
export function loadEnv() {
  const ROOT_PATH = path.join(__dirname, '..', '..')
  const ENV_FILES = [path.join(ROOT_PATH, '.env.local'), path.join(ROOT_PATH, '.env')]
  // ENV 文件是先加载的优先级高
  if (process.env.NODE_ENV === 'development') {
    ENV_FILES.unshift(path.join(ROOT_PATH, '.env.development.local'), path.join(ROOT_PATH, '.env.development'))
  } else {
    ENV_FILES.unshift(path.join(ROOT_PATH, '.env.production.local'), path.join(ROOT_PATH, '.env.production'))
  }

  ENV_FILES.forEach((file) => {
    load({ path: file })
  })
}

// 确保配置中的字段都存在
export function ensureConfig<T>(conf: T, name: string): T {
  Object.entries(conf).forEach(([key, value]) => {
    if (value === undefined || value === null) throw new Error(`配置 ${name} -> ${key} 是 ${value}，请检查 .env 文件`)
  })
  return conf
}
