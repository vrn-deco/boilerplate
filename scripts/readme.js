/*
 * @Author: Cphayim
 * @Date: 2020-07-06 15:39:52
 * @LastEditTime: 2020-07-06 21:40:52
 * @Description: 生成 README.md
 */
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import YAML from 'yaml'
import TurndownService from 'turndown'

import pkg from '../package.json'
import { RELEASE_YML_FILE } from './config'
import { Logger } from '@naughty/logger'

if (!existsSync(RELEASE_YML_FILE)) {
  Logger.error('找不到资源描述文件，请先执行发布流程: npm run release')
  process.exit(0)
}

const resource = YAML.parse(readFileSync(RELEASE_YML_FILE).toString())

const README_FILE = join(__dirname, '..', 'README.md')

const tagList = [
  {
    label: 'build state',
    imgUrl: 'https://travis-ci.org/Cphayim/boilerplate.svg',
    linkUrl: 'https://travis-ci.org/github/Cphayim/boilerplate',
  },
  {
    label: 'node.js version',
    imgUrl: 'https://img.shields.io/badge/node.js-10+-green.svg',
    linkUrl: 'https://nodejs.org/',
  },
]

const content = `
  <h1>${pkg.name}</h1>
  <p>${pkg.description}</p>

  <p>
    ${tagList.map((tag) => buildTag(tag)).join(' ')}
  </p>

  ${resource
    .map((item) => {
      return [buildTitle(item.title), buildTable(item.boilerplates)].join('')
    })
    .join(' ')}
`

function buildTag(tag) {
  return `
    <a href="${tag.linkUrl}">
      <img src="${tag.imgUrl}" alt="${tag.label}"/>
    </a>
  `
}

function buildTitle(title) {
  return `<h3>${title}</h3>`
}

function buildTable(boilerplates) {
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Package</th>
        </tr>
      </thead>
      <tbody>
        ${boilerplates.map((item) => buildTableItem(item)).join('')}
      </tbody>
    </table>
  `
}

function buildTableItem(item) {
  return `
    <tr>
      <td>${item.title.replace(/</g, '&lt').replace(/>/g, '&gt')}</td>
      <td>${item.tags.join(', ')}</td>
      <td><a href="./packages/${item.key}">${item.key}</a></td>
    </tr>
  `
}

const turndownService = new TurndownService()
const markdown = turndownService.turndown(content)

writeFileSync(README_FILE, content)
Logger.success('生成 README.md')
