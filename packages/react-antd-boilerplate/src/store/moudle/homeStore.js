/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-13 09:16:45
 * @Description: homeStore
 */

class Constant {
  static SET_ROUTE_NAME = 'SET_ROUTE_NAME'
}

export class Action {
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

// 导出homeStore仓库
export const homeStore = (state = Reducer.initialState, action = {}) => {
  const { type, payload } = action
  return Reducer[type] ? Reducer[type](state, payload) : state
}
