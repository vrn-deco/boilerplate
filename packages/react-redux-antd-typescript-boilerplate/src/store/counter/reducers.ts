/*
 * @Author: Cphayim
 * @Date: 2019-09-10 16:57:44
 * @LastEditTime: 2019-09-17 15:23:56
 * @Description: counter reducer
 */
import { combineReducers } from 'redux'
import { ActionType, createReducer } from 'typesafe-actions'

import * as counterActions from './actions'
import { ADD, INCREMENT } from './constants'

export type CounterAction = ActionType<typeof counterActions>
export type CounterState = Readonly<{
  count: number
}>

const initialState: CounterState = {
  count: 0,
}

// 原生 redux 写法
// const counterReducer = (
//   state: CounterState = initialState,
//   action: CounterAction,
// ): CounterState => {
//   switch (action.type) {
//     case ADD:
//       return { ...state, count: action.payload }
//     case INCREMENT:
//       return { ...state, count: state.count + 1 }
//     default:
//       return state
//   }
// }

// 改进写法，将 state 打散到具体的 reducer 中处理，再通过 combine 合并
const count = createReducer(initialState.count)
  .handleAction(INCREMENT, (state, action) => state + 1)
  .handleAction(ADD, (state, action) => state + action.payload)

const counterReducer = combineReducers<CounterState, CounterAction>({ count })

export default counterReducer
