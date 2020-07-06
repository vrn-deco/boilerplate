/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:00:20
 * @LastEditTime: 2020-07-06 10:49:26
 * @Description: 配置文件
 */
import { join } from 'path'
import { readFileSync } from 'fs'
import YAML from 'yaml'
import dotenv from 'dotenv'

dotenv.config()

// 打包文件后缀
export const TGZ_EXT = '.tgz'

export const ROOT_DIR = join(__dirname, '..')
export const PKG_DIR = join(ROOT_DIR, 'packages')
export const RELEASE_DIR = join(ROOT_DIR, 'release')
export const RELEASE_YML_FILE = join(RELEASE_DIR, 'boilerplate.yml')
export const RELEASE_JSON_FILE = join(RELEASE_DIR, 'boilerplate.json')
export const NGINX_CONF = join(ROOT_DIR, 'boilerplate.conf')

// 打包时忽略的文件列表
export const IGNORES = [
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

// 服务端目录与配置
export const SERVER_SIDE_USER = 'root'
export const SERVER_SIDE_IP = '172.16.1.10'
export const SERVER_SIDE_RELEASE_DIR = '/projects/boilerplate/'
export const SERVER_SIDE_NGINX_CONF_DIR = '/etc/nginx/conf.d/'

export const PRIVATE_KEY = join(ROOT_DIR, 'keys', 'boilerplate_rsa')

const RESOURCE_FILE = join(ROOT_DIR, 'resource.yml')
export const releaseMap = YAML.parse(readFileSync(RESOURCE_FILE).toString())
