/*
 * @Author: Cphayim
 * @Date: 2020-07-13 10:55:12
 * @LastEditTime: 2020-07-15 23:29:27
 * @Description: 示例 store，除 Store 类以外请不要导出其余部分（单一入口）
 */
import { action, createReducer } from 'typesafe-actions'
import { Module } from '@/store/base'

@Module({ name: 'counter' })
class CounterConstant {
  static readonly INCREMENT = 'INCREMENT'
  static readonly DECREMENT = 'DECREMENT'
  static readonly SET = 'SET'
}

class CounterAction {
  // 自增
  static increment = () => action(CounterConstant.INCREMENT)
  // 自减
  static decrement = () => action(CounterConstant.DECREMENT)
  // 指定数值
  static set = (num: number) => action(CounterConstant.SET, num)
}

export type CounterState = Readonly<{
  count: number
}>
const initialState: CounterState = {
  count: 0,
}

export class CounterStore {
  static readonly action = CounterAction

  static getReducer() {
    return createReducer(initialState)
      .handleAction(CounterConstant.INCREMENT, (state) => ({ ...state, count: state.count + 1 }))
      .handleAction(CounterConstant.DECREMENT, (state) => ({ ...state, count: state.count - 1 }))
      .handleAction(CounterConstant.SET, (state, { type, payload }) => ({
        ...state,
        count: payload,
      }))
  }
}
