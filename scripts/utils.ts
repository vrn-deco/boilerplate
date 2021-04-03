/*
 * @Author: Cphayim
 * @Date: 2021-04-01 15:13:23
 * @Description: 工具箱
 */
import path from 'path'
import fs from 'fs'

import sh from 'shelljs'

import { IGNORE_LIST, NGINX_CONF_FILE, PKG_DIR, ROOT_DIR } from './config'
import { Boilerplate, Resource } from './types'

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

export function getArgByEnvOrBlock(field: string) {
  if (process.env[field]) {
    return process.env[field]!
  } else {
    throw new ReferenceError(`找不到环境变量 ${field}, 请检查 env 文件或 CI 环境变量设置`)
  }
}

export function genSSHPrivateKey(localKeyFile: string) {
  let content = ''

  if (process.env['VRN_REMOTE_SERVER_SSH_PRIVATE_KEY']) {
    content = process.env['VRN_REMOTE_SERVER_SSH_PRIVATE_KEY']
  } else if (fs.existsSync(localKeyFile)) {
    content = fs.readFileSync(localKeyFile).toString()
  } else {
    throw new ReferenceError('私钥不存在，请检查环境变量或本地文件')
  }

  const tempFile = path.join(ROOT_DIR, 'tmp', `key_${Math.random().toString().slice(2, 10)}`)

  sh.exec(`
    set -e
    cd ${ROOT_DIR}
    rm -rf tmp
    mkdir tmp
    echo '${content}'>${tempFile}
    chmod 600 ${tempFile}
  `)

  return tempFile
}

export function makeNginxConf() {
  const PORT = 80
  const BOILERPLATE_SERVER_NAME = getArgByEnvOrBlock('BOILERPLATE_SERVER_NAME')
  const BOILERPLATE_DEPLOY_DIR = getArgByEnvOrBlock('BOILERPLATE_DEPLOY_DIR')

  const content = `
    server {
      listen ${PORT};
      server_name ${BOILERPLATE_SERVER_NAME};

      location / {
        root ${BOILERPLATE_DEPLOY_DIR};
        index  index.html;
        try_files $uri $uri/ /index.html;
      }
    }
  `

  fs.writeFileSync(NGINX_CONF_FILE, content)
}

export function injectToMark(mark: string, content: string, injectContent: string) {
  const reg = new RegExp(`(<!-- ${mark} inject -->)[\\s\\S]*(<!-- /${mark} inject -->)`)
  return content.replace(reg, `$1\n${injectContent}\n$2`)
}
