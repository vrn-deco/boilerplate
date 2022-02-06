#!/bin/sh

set -e

prettier --write --parser typescript "manifest/**/*.ts"
prettier --write --parser typescript "protocol/**/*.ts"
# prettier --write --parser typescript "presets/**/*.ts"
# prettier --write --parser typescript "packages/**/*.ts"
prettier --write "packages/**/*.js"
