/*
 * @Author: Cphayim
 * @Date: 2021-04-01 13:36:43
 * @Description: 配置参数
 */

import path from 'path'
import dotenv from 'dotenv'

// 基本目录路径
export const ROOT_DIR = path.join(__dirname, '..')
export const PKG_DIR = path.join(ROOT_DIR, 'packages')
export const RELEASE_DIR = path.join(ROOT_DIR, 'release')

// 基本文件路径
export const RESOURCE_JSON_FILE = path.join(RELEASE_DIR, 'resource.json')
export const NGINX_CONF_FILE = path.join(RELEASE_DIR, 'boilerplate.conf')

// 打包后的文件后缀
export const TGZ_EXT = '.tgz'

// 载入环境变量
const envFiles = ['.env', '.env.local']
envFiles.forEach((item) => dotenv.config({ path: path.join(ROOT_DIR, item) }))

// 打包时忽略的文件列表
export const IGNORE_LIST: string[] = [
  // mac 缓存文件
  '.DS_Store',
  /**
   * Start: JS 项目
   */
  // 依赖包
  'node_modules',
  // vue 打包输出
  'dist',
  // react 打包输出
  'build',
  /**
   * End: JS 项目
   */

  /**
   * Start: Flutter 项目
   */
  '.idea',
  '.dart_tool',
  '.flutter-plugins',
  '.flutter-plugins-dependencies',
  '.packages',
  '.pub-cache/',
  '.pub/',
  /**
   * End: Flutter 项目
   */
]
