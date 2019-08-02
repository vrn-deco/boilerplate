#!/usr/bin/env node
/*
 * @Author: Cphayim
 * @Date: 2019-06-28 16:28:26
 * @LastEditTime: 2019-08-02 13:43:31
 * @Description: 一键发布脚本
 */
import { join } from 'path'
import { writeFileSync } from 'fs'
import sh from 'shelljs'
import YAML from 'yaml'

import { PKG_DIR, RELEASE_DIR, TGZ_EXT, releaseInfoTpl, ROOT_DIR, YML_FILE } from './config'
import { Logger } from './log'

/**
 * ? 将 packages 下的所有目录，生成对应的 tgz 文件保存在 release 目录
 * ? 在根目录生成 boilerplate.yml 描述文件
 */

// 初始化目录（如果存在则忽略）-> mkdir -p "$RELEASE_DIR"
sh.mkdir('-p', RELEASE_DIR)
// 清空目录 -> rm -f "$RELEASE_DIR/*"
sh.rm('-f', join(RELEASE_DIR, '*'))

const map = {}

// 生成发布文件 tgz
Logger.info('开始创建发布文件包...')

const result = sh.ls(PKG_DIR).every(pkgName => {
  // 找到对应 boilerplate 下的 package.json 读取版本号
  const version = require(join(PKG_DIR, pkgName, 'package.json')).version
  const tgzName = `${pkgName}${TGZ_EXT}`
  const output = join(RELEASE_DIR, tgzName)
  Logger.info(`创建 tgz 文件 ${tgzName}...`)

  const { code, stderr } = sh.exec(
    `
      set -e

      cd ${PKG_DIR}
      # 创建 tgz 压缩包
      tar --exclude=node_modules --exclude=.DS_Store -P -cvzf ${output} ${pkgName}
    `,
    { silent: true, shell: '/bin/zsh' }
  )
  if (code) {
    Logger.error(`${tgzName}打包失败: ${stderr}`)
    return false
  }
  Logger.success(`${output}`)
  map[pkgName] = { version, tgz: tgzName }
  return true
})

if (result) {
  Logger.success('发布文件包创建成功')
  Logger.info('开始生成 yml 文件')
  genReleaseYaml()
  Logger.success(`写入文件: ${YML_FILE}`)
}

function genReleaseYaml() {
  releaseInfoTpl.forEach(base => {
    base.boilerplates.forEach(boilerplate => {
      if (map[boilerplate.name]) {
        boilerplate.version = map[boilerplate.name].version
        boilerplate.tgz = map[boilerplate.name].tgz
      }
    })
  })
  writeFileSync(YML_FILE, YAML.stringify(releaseInfoTpl))
}
