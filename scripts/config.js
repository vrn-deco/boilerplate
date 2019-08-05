/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:00:20
 * @LastEditTime: 2019-08-05 15:15:54
 * @Description: 配置文件
 */
import { join } from 'path'
import { readFileSync } from 'fs'
import YAML from 'yaml'
import dotenv from 'dotenv'

dotenv.config()

const TPL_FILE = join(__dirname, 'boilerplate.tpl.yml')

// 本地目录与配置
export const TGZ_EXT = '.tgz'
export const ROOT_DIR = join(__dirname, '..')
export const PKG_DIR = join(ROOT_DIR, 'packages')
export const RELEASE_DIR = join(ROOT_DIR, 'release')
export const YML_FILE = join(RELEASE_DIR, 'boilerplate.yml')
export const NGINX_CONF = join(ROOT_DIR, 'boilerplate.conf')

// 服务端目录与配置
export const SERVER_SIDE_USER = 'root'
export const SERVER_SIDE_IP = '172.16.1.10'
export const SERVER_SIDE_RELEASE_DIR = '/projects/boilerplate/'
export const SERVER_SIDE_NGINX_CONF_DIR = '/etc/nginx/conf.d/'

export const PRIVATE_KEY = join(ROOT_DIR, 'keys', 'boilerplate_rsa')

export const releaseInfoTpl = YAML.parse(readFileSync(TPL_FILE).toString())
