/*
 * @Author: benaozhi
 * @Date: 2020-07-27 23:51:17
 * @LastEditTime: 2020-10-21 15:33:15
 * @Description:
 */
import { genResBody } from '../tool'
let demoList = [
  {
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师',
  },
  {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师',
  },
]

export default {
  'get|/parameter/query': option => {
    return genResBody(demoList)
  },
}
