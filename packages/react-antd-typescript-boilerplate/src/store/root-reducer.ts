/*
 * @Author: Cphayim
 * @Date: 2019-09-16 15:39:24
 * @LastEditTime: 2020-07-17 17:23:04
 * @Description: root-reducer
 */

import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

import { CounterStore } from '@/views/counter/counter.store'
import { GlobalStore } from './global.store'

const createReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    global: GlobalStore.getReducer(),
    counter: CounterStore.getReducer(),
  })

export default createReducer
