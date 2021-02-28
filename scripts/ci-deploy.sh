#!/usr/bin/env bash
###
# @Author: Cphayim
# @Date: 2020-12-15 10:28:23
# @LastEditTime: 2021-03-01 01:34:02
# @Description: CI 部署脚本
###

set -e

if [ ! $BOILERPLATE_DEPLOY_DIR ] || [ ! $VRN_REMOTE_SERVER_NGINX_CONF_DIR ]; then
  echo "环境变量丢失：BOILERPLATE_DEPLOY_DIR, VRN_REMOTE_SERVER_NGINX_CONF_DIR"
  exit 1
fi

ssh vrn "
  set -e
  if [ ! -d $BOILERPLATE_DEPLOY_DIR ];then
    echo '创建目录: ${BOILERPLATE_DEPLOY_DIR}'
    mkdir -p $BOILERPLATE_DEPLOY_DIR
  fi
"

ls release

echo "正在将 release 目录下的文件递归上传"
rsync -a --progress 'release/' vrn:$BOILERPLATE_DEPLOY_DIR
echo '文件部署完毕'

echo "上传 nginx 配置文件"
rsync -a --progress 'boilerplate.conf' vrn:$VRN_REMOTE_SERVER_NGINX_CONF_DIR
echo "nginx 配置文件上传完毕"

echo "正在重载 nginx 服务"
ssh vrn "
  set -e
  systemctl reload nginx
"
echo "部署成功"
