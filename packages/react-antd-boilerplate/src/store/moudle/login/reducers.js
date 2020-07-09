/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:19:52
 * @LastEditTime: 2020-07-09 16:49:11
 * @Description: login模块reducer
 */

import { REMEMBER_PASSWORD } from './constants'

// 定义login模块变量
const loginState = {
  rememberPassword: false
}

// 改变login模块变量
export const loginReducer = (state = loginState, action = {}) => {
  const { type, payload } = action
  switch (type) {
    case REMEMBER_PASSWORD:
      return Object.assign({}, state, {
        rememberPassword: payload,
      })
    default:
      return state
  }
}
