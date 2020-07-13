/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:18:03
 * @LastEditTime: 2020-07-13 14:04:52
 * @Description: 创建store仓库
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { GlabelStore } from '../views/glabel.store'
import { HomeStore } from '../views/reactPage/index.store'
import { LoginStore } from '../views/login/index.store'

const moudleReducer = {
  glabelStore: GlabelStore.createReducer(),
  homeStore: HomeStore.createReducer(),
  loginStore: LoginStore.createReducer(),
}

//  把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
const reducer = combineReducers(moudleReducer)

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default store
