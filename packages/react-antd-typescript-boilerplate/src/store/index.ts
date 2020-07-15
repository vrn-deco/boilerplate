/*
 * @Author: Cphayim
 * @Date: 2020-07-06 12:57:34
 * @LastEditTime: 2020-07-15 10:25:17
 * @Description:
 */
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer'

// browser history
export const history = createBrowserHistory()
const routerMiddleware = createRouterMiddleware(history)

// configure middlewares
const middlewares = [thunk, routerMiddleware]
// compose enhancers
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
export const store = createStore(rootReducer(history), initialState, composeEnhancer)
