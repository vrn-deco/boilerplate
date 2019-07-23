/*
 * @Author: Cphayim
 * @Date: 2019-06-28 16:28:26
 * @LastEditTime: 2019-07-23 14:32:05
 * @Description: 生成发布文件和配置
 */
import { join } from 'path'
import { writeFileSync } from 'fs'
import sh from 'shelljs'
import YAML from 'yaml'

import { PKG_DIR, RELEASE_DIR, TGZ_EXT, releaseInfoTpl, ROOT_DIR } from './config'
import { Logger } from './log'

// 初始化目录（如果存在则忽略）-> mkdir -p "$RELEASE_DIR"
sh.mkdir('-p', RELEASE_DIR)
// 清空目录 -> rm -f "$RELEASE_DIR/*"
sh.rm('-f', join(RELEASE_DIR, '*'))

// 生成发布文件 tgz
Logger.info('开始创建发布文件包...')
const map = {}
sh.ls(PKG_DIR).forEach(pkgName => {
  // 找到对应 boilerplate 下的 package.json 读取版本号
  const version = require(join(PKG_DIR, pkgName, 'package.json')).version
  const tgzName = `${pkgName}${TGZ_EXT}`
  const output = join(RELEASE_DIR, tgzName)
  Logger.info(`创建 tgz 文件 ${tgzName}`)
  sh.exec(
    `
    cd ${PKG_DIR}
    # 创建 tgz 压缩包
    tar --exclude=node_modules -P -cvzf ${output} ${pkgName}
    `,
    { silent: true }
  )
  Logger.success(`${output}`)
  map[pkgName] = { version, tgz: tgzName }
})
Logger.success('发布文件包创建成功')

function genReleaseYaml() {
  releaseInfoTpl.forEach(base => {
    base.boilerplates.forEach(boilerplate => {
      if (map[boilerplate.name]) {
        boilerplate.version = map[boilerplate.name].version
        boilerplate.tgz = map[boilerplate.name].tgz
      }
    })
  })
  writeFileSync(join(ROOT_DIR, 'boilerplate.yml'), YAML.stringify(releaseInfoTpl))
}
genReleaseYaml()
