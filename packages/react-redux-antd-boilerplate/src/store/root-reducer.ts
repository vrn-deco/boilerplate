/*
 * @Author: Cphayim
 * @Date: 2019-09-16 15:39:24
 * @LastEditTime: 2019-09-17 10:18:11
 * @Description: root-reducer
 */

import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

import { counterReducer } from './counter'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
  })

export default rootReducer
