#!/bin/zsh

NAME=$1

npx typeorm migration:generate -n $1 -d src/database/migrations
