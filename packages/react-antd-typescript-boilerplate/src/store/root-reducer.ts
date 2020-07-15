/*
 * @Author: Cphayim
 * @Date: 2019-09-16 15:39:24
 * @LastEditTime: 2020-07-15 10:30:32
 * @Description: root-reducer
 */

import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

import { CounterStore } from '@/views/counter/counter.store'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    counter: CounterStore.getReducer(),
  })

export default rootReducer
