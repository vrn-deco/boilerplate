/*
 * @Author: Cphayim
 * @Date: 2020-06-05 14:06:29
 * @LastEditTime: 2020-06-15 14:36:23
 * @Description:
 */

import express from 'express'
import { mock } from 'mockjs'
import { ResponseBody } from '../libs/response'

const router = express.Router()

router.get('/', (req, res) => {
  const mockData = mock({
    'slides|2-4': [
      {
        // name: '@cname',
        image: `@image('375x333', '@hex', '#FFF', 'Mock.js')`,
      },
    ],
    'category|12': [
      {
        image: `@image('120x120', '@hex', '#FFF', 'Mock.js')`,
        mallCategoryName: '@cword(2,5)',
      },
    ],
    advertsPicture: {
      picture_address: `@image('1080x100', '@hex', '#FFF', 'Mock.js')`,
    },
    leaderInfo: {
      leaderImage: `@image('750x300', '@hex', '#FFF', 'Mock.js')`,
      'leaderPhone|1000-3000': 1000,
    },
    'recommend|0-10': [
      {
        image: `@image('500x500', '@hex', '#FFF', 'Mock.js')`,
        'price|1-100.1': 1,
        'mallPrice|1-100.1': 1,
      }
    ]
  })
  res.json(new ResponseBody({ data: mockData }))
})

export default router
