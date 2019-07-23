/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:00:20
 * @LastEditTime: 2019-07-23 10:03:42
 * @Description: 配置文件
 */
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config()

export const ROOT_DIR = join(__dirname, '..')
export const PKG_DIR = join(ROOT_DIR, 'packages')
export const RELEASE_DIR = join(ROOT_DIR, 'release')
export const TGZ_EXT = '.tgz'

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
