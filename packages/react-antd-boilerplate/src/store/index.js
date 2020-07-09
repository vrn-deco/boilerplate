/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:18:03
 * @LastEditTime: 2020-07-09 16:42:03
 * @Description: 创建store仓库
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { globelReducer } from './reducers'
import * as moudleReducer from './moudle/moudleReducer'

//  把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
const reducer = combineReducers({
  globelReducer,
  ...moudleReducer
})

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default store
