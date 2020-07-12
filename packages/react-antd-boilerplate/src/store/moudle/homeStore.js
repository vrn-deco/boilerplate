/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-12 10:56:48
 * @Description: homeStore
 */

class Constant {
  static SET_ROUTE_NAME = 'SET_ROUTE_NAME'
}

class Action {
  // 存储路由名称
  static setRouteName = (routeName) => ({ type: Constant.SET_ROUTE_NAME, payload: routeName })
}

class Reducer {
  static initialState = {
    routeName: null,
  }

  static [Constant.SET_ROUTE_NAME](state, routeName) {
    return { ...state, routeName }
  }
}

// 导出glabel仓库
export class HomeStore {
  createReducer() {
    return (state = Reducer.initialState, action = {}) => {
      const { type, payload } = action
      return Reducer[type] ? Reducer[type](state, payload) : state
    }
  }

  static action = Action
}
