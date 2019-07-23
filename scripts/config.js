/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:00:20
 * @LastEditTime: 2019-07-23 15:43:26
 * @Description: 配置文件
 */
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config()

// 本地目录与配置
export const TGZ_EXT = '.tgz'
export const ROOT_DIR = join(__dirname, '..')
export const PKG_DIR = join(ROOT_DIR, 'packages')
export const RELEASE_DIR = join(ROOT_DIR, 'release')
export const YML_FILE = join(ROOT_DIR, 'boilerplate.yml')
export const NGINX_CONF = join(ROOT_DIR, 'boilerplate.conf')

// 服务端目录与配置
export const SERVER_SIDE_USER = 'root'
export const SERVER_SIDE_IP = '172.16.1.10'
export const SERVER_SIDE_RELEASE_DIR = '/projects/boilerplate/'
export const SERVER_SIDE_NGINX_CONF_DIR = '/etc/nginx/conf.d/'

export const PRIVATE_KEY = join(ROOT_DIR, 'keys', 'boilerplate_rsa')

export const releaseInfoTpl = [
  {
    base: 'Vue',
    boilerplates: [
      {
        title: 'ElementUI',
        type: 'PC Web',
        name: 'vue-elementui-boilerplate',
        version: '',
        tgz: ''
      },
      {
        title: 'VantUI',
        type: 'Mobile Web',
        name: 'vue-vantui-boilerplate',
        version: '',
        tgz: ''
      },
      {
        title: 'VantUI + H5Plus',
        type: 'Hybrid App',
        name: 'vue-vantui-h5plus-boilerplate',
        version: '',
        tgz: ''
      }
    ]
  }
]
