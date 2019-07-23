/*
 * @Author: Cphayim
 * @Date: 2019-06-28 16:28:26
 * @LastEditTime: 2019-07-23 10:05:58
 * @Description: 生成发布文件和配置
 */
import { join } from 'path'
import { writeFileSync } from 'fs'
import sh from 'shelljs'
import YAML from 'yaml'

import { PKG_DIR, RELEASE_DIR, TGZ_EXT, releaseInfoTpl, ROOT_DIR } from './config'

// 初始化目录（如果存在则忽略）-> mkdir -p "$RELEASE_DIR"
sh.mkdir('-p', RELEASE_DIR)
// 清空目录 -> rm -f "$RELEASE_DIR/*"
sh.rm('-f', join(RELEASE_DIR, '*'))

// 生成发布文件 tgz
const map = {}
sh.ls(PKG_DIR).forEach(pkgName => {
  const entry = join(PKG_DIR, pkgName)
  const version = require(join(entry, 'package.json')).version
  const tgzName = `${pkgName}${TGZ_EXT}`
  const output = join(RELEASE_DIR, tgzName)
  sh.exec(`tar --exclude=node_modules -P -cvzf ${output} ${entry}`, { silent: true })

  map[pkgName] = { version, tgz: tgzName }
})

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

// TODO: 更新 boilerplate.yml
// TODO: 上传 tgz 到七牛云
