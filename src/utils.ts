/*
 * @Author: Cphayim
 * @Date: 2021-04-01 15:13:23
 * @Description: 工具箱
 */
import path from 'path'
import sh from 'shelljs'
import compressing from 'compressing'
import { IGNORE_LIST, PKG_DIR } from './config'
import { Boilerplate, Resource } from './types'

/**
 * 遍历 Resource 下的所有 boilerplate
 */
export function traverseBoilerplate(resource: Resource, callback: (boilerplate: Boilerplate, path: string) => void) {
  resource.forEach((lang) => {
    lang.frameworks.forEach((framework) => {
      framework.boilerplate.forEach((boilerplate) => {
        // 拼出完整路径调用回调
        const paths = [PKG_DIR, lang.key, framework.key, boilerplate.key]
        const fullPath = path.join(...paths)
        callback(boilerplate, fullPath)
      })
    })
  })
}

/**
 * TarGzip 压缩
 */
export function tgzCompress(base: string, target: string, output: string) {
  const ignoreArgs = IGNORE_LIST.map((i) => `--exclude ${i}`).join(' ')
  return sh.exec(
    `
      set -e
      cd ${base}
      # 创建 tgz 压缩包
      # -P 绝对路径还原
      # -h 打包软链指向的文件而不是软链文件
      tar ${ignoreArgs} -cvzPhf ${output} ${target}
    `,
    { silent: true }
  )
}
