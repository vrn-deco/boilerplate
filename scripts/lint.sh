#!/bin/sh

set -e

eslint manifest/src/**.ts
eslint protocol/src/**.ts
eslint presets/*/src/**.ts

# not lint boilerplate, because it has self-defined rules
# eslint --ext .js,.ts packages
