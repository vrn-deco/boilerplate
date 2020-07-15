/*
 * @Author: Cphayim
 * @Date: 2020-07-06 12:57:34
 * @LastEditTime: 2020-07-15 12:42:35
 * @Description:
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import { history } from '@/router/history'

import createReducer from './root-reducer'

// browser history
const routerMiddleware = createRouterMiddleware(history)

// configure middlewares
const middlewares = [thunk, routerMiddleware]
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
}

// compose enhancers
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

const initialState = {}
const reducer = createReducer(history)

export const store = createStore(reducer, initialState, composeEnhancer)
