#!/bin/sh

set -e

eslint manifest/src/**.ts
eslint protocol/src/**.ts
# eslint presets/*/src/**.ts
eslint --ext .js,.ts packages
