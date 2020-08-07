/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:18:03
 * @LastEditTime: 2020-08-07 17:06:15
 * @Description: 创建store仓库
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { history } from '@/router/history'
import { GlabelStore } from './glabel.store'
import { HomeStore } from '@/views/reactPage/index.store'
import { LoginStore } from '@/views/login/index.store'


const routerMiddleware = createRouterMiddleware(history)

// reducer集合
const moudleReducer = {
  router: connectRouter(history),
  glabelStore: GlabelStore.createReducer(),
  homeStore: HomeStore.createReducer(),
  loginStore: LoginStore.createReducer(),
}

// middleWare集合
const middlewares = [thunk, routerMiddleware]

// 把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
const reducer = combineReducers(moudleReducer)

// 合并多个applyMiddleware
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(reducer, {}, composeEnhancer)

export default store
