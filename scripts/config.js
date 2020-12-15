#!/usr/bin/env cy-node
/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:00:20
 * @LastEditTime: 2020-12-14 16:37:27
 * @Description: 配置文件
 */

import { join } from 'path'
import { readFileSync } from 'fs'
import YAML from 'yaml'
import dotenv from 'dotenv'
import { getArgByEnvOrBlock, genSSHPrivateKey } from './utils'

export const ROOT_DIR = join(__dirname, '..')
export const PKG_DIR = join(ROOT_DIR, 'packages')

const envFiles = ['.env', '.env.local']
envFiles.forEach((item) => dotenv.config({ path: join(ROOT_DIR, item) }))

// 打包文件后缀
export const TGZ_EXT = '.tgz'

// 打包文件
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
export const SERVER_SIDE_USER = getArgByEnvOrBlock('VRN_REMOTE_SERVER_USER')
export const SERVER_SIDE_IP = getArgByEnvOrBlock('VRN_REMOTE_SERVER_ADDRESS')
export const SERVER_SIDE_RELEASE_DIR = getArgByEnvOrBlock('VRN_REMOTE_SERVER_RELEASE_DIR')
export const SERVER_SIDE_NGINX_CONF_DIR = getArgByEnvOrBlock('VRN_REMOTE_SERVER_NGINX_CONF_DIR')

// 本地私钥
const LOCAL_PRIVATE_KEY = join(ROOT_DIR, 'keys', 'boilerplate_rsa')

export const SSH_PRIVATE_KEY = genSSHPrivateKey({
  envKey: 'VRN_REMOTE_SERVER_SSH_PRIVATE_KEY',
  localKeyFile: LOCAL_PRIVATE_KEY,
  rootDir: ROOT_DIR,
})

// 发布用资源对象
const RESOURCE_FILE = join(ROOT_DIR, 'resource.yml')
export const releaseMap = YAML.parse(readFileSync(RESOURCE_FILE).toString())
