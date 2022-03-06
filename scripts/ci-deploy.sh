#!/bin/sh
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
    echo 'Create directory: ${BOILERPLATE_DEPLOY_DIR}'
    mkdir -p $BOILERPLATE_DEPLOY_DIR
  fi
"

echo "Recursively uploading files from the \`release\` directory\n"
rsync -a --progress 'release/' vrn:$BOILERPLATE_DEPLOY_DIR
echo "Finished uploading files"
