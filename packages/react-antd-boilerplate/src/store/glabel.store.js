/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-09-04 17:17:27
 * @Description: glabelStore
 */

import { authAPI } from '@/apis'
import { history } from '@/router/history'
import { LocalStorageItem } from '@/utils/storage'

// 创建token的localStorage存储
const tokenLSI = new LocalStorageItem({ fieldName: 'token' })

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
      const res = await authAPI.getMock(data)
      dispatch(this.setUserInfo(res.data.userInfo[0].name))
      dispatch(this.setToken(res.data.userInfo[0].id))
      history.push('/login')
    }
  }
}

class Reducer {
  static initialState = {
    userInfo: 'vrn',
    token: tokenLSI.get(),
  }

  static [Constant.SET_USER_INFO](state, userInfo) {
    return { ...state, userInfo }
  }

  static [Constant.SET_TOKEN](state, token) {
    tokenLSI.set(token)
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
