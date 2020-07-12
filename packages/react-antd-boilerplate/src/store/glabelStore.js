/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-12 10:48:38
 * @Description: glabelStore
 */

class Constant {
  static SET_USER_INFO = 'SET_USER_INFO'
  static SET_TOKEN = 'SET_TOKEN'
}

class Action {
  // 存储用户信息
  static setUserInfo = (userInfo) => ({ type: Constant.SET_USER_INFO, payload: userInfo })
  // 存储用户Token
  static setToken = (token) => ({ type: Constant.SET_TOKEN, payload: token })
}

class Reducer {
  static initialState = {
    userInfo: null,
    token: null,
  }

  static [Constant.SET_USER_INFO](state, userInfo) {
    return { ...state, userInfo }
  }

  static [Constant.SET_TOKEN](state, token) {
    return { ...state, token }
  }
}

// 导出glabel仓库
export class GlabelStore {
    createReducer() {
        return (state = Reducer.initialState, action = {}) => {
            const { type, payload } = action
            return Reducer[type] ? Reducer[type](state, payload) : state
        }
    }

    static action = Action
}
