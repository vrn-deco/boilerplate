/*
 * @Author: Cphayim
 * @Date: 2020-07-06 15:39:52
 * @LastEditTime: 2020-07-07 16:35:36
 * @Description: 生成 README.md
 */
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join, basename } from 'path'
import YAML from 'yaml'
import TurndownService from 'turndown'

import { render } from '../docs/readme/render'
import pkg from '../package.json'
import { RELEASE_YML_FILE } from './config'
import { Logger } from '@naughty/logger'

if (!existsSync(RELEASE_YML_FILE)) {
  Logger.error('找不到资源描述文件，请先执行发布流程: npm run release')
  process.exit(0)
}

const resource = YAML.parse(readFileSync(RELEASE_YML_FILE).toString())

const README_EN_FILE = join(__dirname, '..', 'README.md')
const README_ZH_FILE = join(__dirname, '..', 'README-ZH.md')

function genReadme(file, lang = 'en') {
  const content = render({ pkg, resource, lang })
  writeFileSync(file, content)
  Logger.success(`${basename(file)} 写入`)
}

Logger.info('开始生成 README.md')
genReadme(README_EN_FILE, 'en')
genReadme(README_ZH_FILE, 'zh')
