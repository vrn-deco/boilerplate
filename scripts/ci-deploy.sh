#!/usr/bin/env bash
###
# @Author: Cphayim
# @Description: CI deploy script
###

set -e

MANIFEST_PACKAGE_PATH=manifest

cd $MANIFEST_PACKAGE_PATH

if [ ! $BOILERPLATE_DEPLOY_DIR ]; then
  echo "Environment variables $(BOILERPLATE_DEPLOY_DIR) not found"
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
