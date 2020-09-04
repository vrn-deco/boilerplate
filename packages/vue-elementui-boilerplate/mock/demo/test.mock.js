/*
 * @Author: benaozhi
 * @Date: 2020-07-27 23:51:17
 * @LastEditTime: 2020-08-03 23:22:29
 * @Description:
 */
import { Restful } from '../restful'
let demoList = [{
  id: 1,
  name: 'zs',
  age: '23',
  job: '前端工程师'
}, {
  id: 2,
  name: 'ww',
  age: '24',
  job: '后端工程师'
}]

export default {
  'get|/parameter/query': (option) => {
    return Restful.setResult(demoList)
  }
}
