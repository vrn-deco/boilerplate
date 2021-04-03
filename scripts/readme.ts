/*
 * @Author: Cphayim
 * @Date: 2021-04-03 15:09:27
 * @Description: README.md 生成
 */
import path from 'path'
import fs from 'fs'
import nunjucks from 'nunjucks'

import { ROOT_DIR } from './config'
import { resource } from './resource'
import { injectToMark } from './utils'
import { Logger } from '@naughty/logger'

const README = path.join(ROOT_DIR, 'README.md')
const TPL_DIR = path.join(ROOT_DIR, 'docs', 'readme')

const BASE_README = fs.readFileSync(path.join(TPL_DIR, 'BASE_README.md')).toString()

function renderResource(): string {
  return nunjucks
    .configure(TPL_DIR, { autoescape: true, lstripBlocks: true, trimBlocks: true })
    .render('resource.njk', { resource })
}

Logger.info('创建 README.md 文件')
fs.writeFileSync(README, injectToMark('resource', BASE_README, renderResource()))
Logger.success(path.relative(ROOT_DIR, README))
