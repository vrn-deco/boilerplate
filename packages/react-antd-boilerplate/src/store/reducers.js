/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:19:52
 * @LastEditTime: 2020-07-09 16:09:26
 * @Description: reducer
 */

import { TITLE, STATUS } from './constants'

// 定义store全局变量
const globelState = {
  title: '',
  status: false,
}

// 改变store全局变量
export const globelReducer = (state = globelState, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case TITLE:
      return Object.assign({}, state, {
        title: payload,
      })
    case STATUS:
      return Object.assign({}, state, {
        status: payload,
      })
    default:
      return state
  }
}
