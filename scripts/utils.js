/*
 * @Author: Cphayim
 * @Date: 2020-07-06 10:27:19
 * @LastEditTime: 2020-12-14 16:35:59
 * @Description:
 */

import { join } from 'path'
import { existsSync, readFileSync, chmodSync } from 'fs'
import sh from 'shelljs'

export function getArgByEnvOrBlock(field) {
  if (process.env[field]) {
    return process.env[field]
  } else {
    throw new ReferenceError(`找不到环境变量 ${field}, 请检查 env 文件或 CI 环境变量设置`)
  }
}

export function genSSHPrivateKey({ localKeyFile, rootDir }) {
  let content = ''

  if (process.env['SSH_PRIVATE_KEY']) {
    // 环境变量存在私钥使用环境变量（CI）
    content = process.env['SSH_PRIVATE_KEY']
  } else if (existsSync(localKeyFile)) {
    // 传入的本地私钥存在使用本地私钥
    content = readFileSync(localKeyFile).toString()
  } else {
    throw new ReferenceError('私钥不存在，请检查环境变量或本地文件')
  }

  const tempFile = join(rootDir, 'tmp', `key_${Math.random().toString().slice(2, 10)}`)

  sh.exec(`
    set -e
    cd ${rootDir}
    rm -rf tmp
    mkdir tmp
    echo '${content}'>${tempFile}
    chmod 600 ${tempFile}
  `)
  return tempFile
}
