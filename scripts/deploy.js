#!/usr/bin/env cy-node
/*
 * @Author: Cphayim
 * @Date: 2019-06-28 09:21:54
 * @LastEditTime: 2021-03-12 14:31:26
 * @Description: 一键部署脚本
 */
import { join } from 'path'
import sh from 'shelljs'
import { Logger } from '@naughty/logger'
import { RELEASE_DIR, NGINX_CONF, ROOT_DIR } from './config'
import { getArgByEnvOrBlock, genSSHPrivateKey } from './utils'

// 服务端目录与配置
const SERVER_SIDE_USER = getArgByEnvOrBlock('VRN_REMOTE_SERVER_USER')
const SERVER_SIDE_IP = getArgByEnvOrBlock('VRN_REMOTE_SERVER_ADDRESS')
const SERVER_SIDE_RELEASE_DIR = getArgByEnvOrBlock('VRN_REMOTE_SERVER_RELEASE_DIR')
const SERVER_SIDE_NGINX_CONF_DIR = getArgByEnvOrBlock('VRN_REMOTE_SERVER_NGINX_CONF_DIR')

// 本地私钥
const LOCAL_PRIVATE_KEY = join(ROOT_DIR, 'keys', 'boilerplate_rsa')

const SSH_PRIVATE_KEY = genSSHPrivateKey({
  envKey: 'VRN_REMOTE_SERVER_SSH_PRIVATE_KEY',
  localKeyFile: LOCAL_PRIVATE_KEY,
  rootDir: ROOT_DIR,
})

/**
 * ?将模板包和配置文件上传到服务器对应目录
 * ?上传 nginx 配置文件，重启 nginx 服务
 */
Logger.info('开始执行部署...')
const { code, stderr } = sh.exec(
  `
    set -e
    # 设置目录权限
    ssh ${SERVER_SIDE_USER}@${SERVER_SIDE_IP} -i ${SSH_PRIVATE_KEY} "
      set -e
      # 创建对应目录，设置权限
      mkdir -p ${SERVER_SIDE_RELEASE_DIR}
      chmod 755 ${SERVER_SIDE_RELEASE_DIR}
    "

    # 将 release 目录下的文件递归提交到服务端指定目录
    echo '正在将 release 目录下的文件递归上传至 ${SERVER_SIDE_IP} 服务器'
    scp -i ${SSH_PRIVATE_KEY} ${RELEASE_DIR}/* ${SERVER_SIDE_USER}@${SERVER_SIDE_IP}:${SERVER_SIDE_RELEASE_DIR}
    echo '文件部署完毕'

    # 上传 nginx 配置
    # echo '正在上传 nginx 配置文件至 ${SERVER_SIDE_IP} 服务器 '
    # scp -i ${SSH_PRIVATE_KEY} ${NGINX_CONF} ${SERVER_SIDE_USER}@${SERVER_SIDE_IP}:${SERVER_SIDE_NGINX_CONF_DIR}
    # echo 'nginx 配置文件部署完毕'

    # echo '正在为 ${SERVER_SIDE_IP} 服务器重载 nginx 服务'
    # ssh ${SERVER_SIDE_USER}@${SERVER_SIDE_IP} -i ${SSH_PRIVATE_KEY} "
    #   set -e
    #   # 重载 nginx 服务
    #   systemctl reload nginx
    # "
  `,
  { shell: '/bin/zsh' }
)

if (!code) {
  Logger.success('部署任务完成')
} else {
  Logger.error(`部署任务失败: ${stderr}`)
}
