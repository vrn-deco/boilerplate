/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-13 14:02:43
 * @Description: homeStore
 */

class Constant {
  static SET_ROUTE_NAME = 'SET_ROUTE_NAME'
}

class Action {
  // 存储路由名称
  setRouteName = (routeName) => ({ type: Constant.SET_ROUTE_NAME, payload: routeName })
}

class Reducer {
  static initialState = {
    routeName: null,
  };

  [Constant.SET_ROUTE_NAME](state, routeName) {
    return { ...state, routeName }
  }
}

export class LoginStore {
  static createReducer() {
    return (state = Reducer.initialState, action = {}) => {
      const { type, payload } = action
      return Reducer[type] ? Reducer[type](state, payload) : state
    }
  }

  static action = new Action()
}
