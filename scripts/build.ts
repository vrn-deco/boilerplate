/*
 * @Author: Cphayim
 * @Date: 2021-04-01 13:57:01
 * @Description: 构建任务
 */
import path from 'path'
import fs from 'fs'

import sh from 'shelljs'
import { Logger } from '@naughty/logger'

import { resource } from './resource'
import { NGINX_CONF_FILE, RELEASE_DIR, RESOURCE_JSON_FILE, ROOT_DIR, TGZ_EXT } from './config'
import { makeNginxConf, tgzCompress, traverseBoilerplate } from './utils'

/**
 * 任务说明：
 * 1. 将 resource 中所有的 Boilerplate，生成对应的 tgz 文件保存在 release 目录
 * 2. 将 resource 转为 resource.json 文件
 */

// 初始化或清空目录
sh.mkdir('-p', RELEASE_DIR) // mkdir -p $RELEASE_DIR
sh.rm('-rf', path.join(RELEASE_DIR, '*')) // rm -rf ${RELEASE_DIR}/*

Logger.info('开始 Build 任务...')

traverseBoilerplate(resource, async (boilerplate, fullPath) => {
  const parentPath = path.dirname(fullPath)
  // 判断目录是否存在
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
    return Logger.error(`${fullPath} 不是一个目录`)
  }

  // 生成 tgz 压缩文件
  const output = path.join(RELEASE_DIR, `${boilerplate.key}${TGZ_EXT}`)

  Logger.info(`创建 tgz 文件 ${boilerplate.key}...`, { tip: '开始' })

  const { code, stderr } = tgzCompress(parentPath, boilerplate.key, output)

  if (code) {
    Logger.error(`${boilerplate.key} 打包失败: ${stderr}`)
    return false
  }
  Logger.success(`${boilerplate.key} -> ${path.relative(ROOT_DIR, output)}`)
})

Logger.info('创建 resource.json 文件')
fs.writeFileSync(RESOURCE_JSON_FILE, JSON.stringify(resource, null, 2))
Logger.success(`resource -> ${path.relative(ROOT_DIR, RESOURCE_JSON_FILE)}`)

Logger.info('创建 boilerplate.conf 文件')
makeNginxConf()
Logger.success(path.relative(ROOT_DIR, NGINX_CONF_FILE))

Logger.info('完成 Build 任务')
