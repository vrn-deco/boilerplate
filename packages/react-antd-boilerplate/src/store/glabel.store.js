/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-08-05 11:18:26
 * @Description: glabelStore
 */

import { authAPI } from '@/apis'
import { history } from '@/router/history'


class Constant {
  static SET_USER_INFO = 'SET_USER_INFO'
  static SET_TOKEN = 'SET_TOKEN'
}

export class Action {
  // 存储用户信息
  setUserInfo = (userInfo) => ({ type: Constant.SET_USER_INFO, payload: userInfo })
  // 存储用户Token
  setToken = (token) => ({ type: Constant.SET_TOKEN, payload: token })

  fetchUser = (data) => {
    return async (dispatch) => {
      const { userInfo } = await authAPI.getMock(data)
      dispatch(this.setUserInfo(userInfo[0].name))
      dispatch(this.setToken(userInfo[0].id))
      history.push('/login')
    }
  }
}

class Reducer {
  static initialState = {
    userInfo: 'vrn',
    token: null,
  }

  static [Constant.SET_USER_INFO](state, userInfo) {
    return { ...state, userInfo }
  }

  static [Constant.SET_TOKEN](state, token) {
    return { ...state, token }
  }
}

export class GlabelStore {
  static createReducer() {
    return (state = Reducer.initialState, action = {}) => {
      const { type, payload } = action
      return Reducer[type] ? Reducer[type](state, payload) : state
    }
  }

  static action = new Action()
}
