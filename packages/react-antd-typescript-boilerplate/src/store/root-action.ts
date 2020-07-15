/*
 * @Author: Cphayim
 * @Date: 2019-09-16 15:39:35
 * @LastEditTime: 2020-07-15 10:35:17
 * @Description: root-action
 * !该文件导出作为 types.d.ts 类型声明使用，否则使用 action 报类型错误
 */

import { routerActions } from 'connected-react-router'
import { CounterStore } from '@/views/counter/counter.store'

export default {
  router: routerActions,
  counter: CounterStore.action,
}
