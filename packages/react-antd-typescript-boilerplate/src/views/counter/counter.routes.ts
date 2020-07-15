/*
 * @Author: Cphayim
 * @Date: 2020-07-13 10:55:20
 * @LastEditTime: 2020-07-15 17:31:14
 * @Description:
 */
import CounterIndexPage from './index'
import CounterRecordPage from './record'

export default [
  {
    path: '/counter/index',
    component: CounterIndexPage,
  },
  {
    path: '/counter/record',
    component: CounterRecordPage,
  },
]
