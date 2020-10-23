/*
 * @Author: Cphayim
 * @Date: 2020-07-07 14:05:22
 * @LastEditTime: 2020-10-23 16:19:46
 * @Description: 渲染 readme
 */

import { join } from 'path'
import nunjucks from 'nunjucks'

import YAML from 'yaml'
import { readFileSync } from 'fs'

const strings = {
  en: loadYAMLFile(join(__dirname, 'lang', 'en-US.yml')),
  zh: loadYAMLFile(join(__dirname, 'lang', 'zh-CN.yml')),
}

const tags = [
  {
    label: 'build state',
    imgUrl: 'https://api.travis-ci.org/vrn-deco/vrn-boilerplate.svg',
    linkUrl: 'https://travis-ci.org/github/vrn-deco/vrn-boilerplate',
  },
  {
    label: 'node.js version',
    imgUrl: 'https://img.shields.io/badge/node.js-10+-green.svg',
    linkUrl: 'https://nodejs.org/',
  },
]

export function render({ pkg, resource, lang = 'en' }) {
  const curPath = join(__dirname)
  return nunjucks.configure(curPath, { autoescape: true, lstripBlocks: true, trimBlocks: true }).render('README.html', {
    pkg,
    tags,
    resource,
    lang,
    strings,
  })
}

function loadYAMLFile(file) {
  return YAML.parse(readFileSync(file).toString())
}
