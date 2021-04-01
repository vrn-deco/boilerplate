/*
 * @Author: Cphayim
 * @Date: 2019-09-16 15:39:35
 * @LastEditTime: 2019-09-16 15:44:52
 * @Description: root-action
 */

import { routerActions } from 'connected-react-router'

import { counterActions } from './counter'

export default {
  router: routerActions,
  counter: counterActions,
}
