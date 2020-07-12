/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:18:03
 * @LastEditTime: 2020-07-12 13:37:30
 * @Description: 创建store仓库
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { glabelStore } from './glabelStore'
import * as moudleReducer from './moudle'

//  把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
const reducer = combineReducers({
  glabelStore,
  ...moudleReducer,
})

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default store
