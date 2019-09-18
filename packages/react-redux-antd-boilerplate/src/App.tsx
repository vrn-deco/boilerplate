/*
 * @Author: Cphayim
 * @Date: 2019-08-28 17:22:39
 * @LastEditTime: 2019-09-17 15:25:33
 * @Description: 入口组件
 */

import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Counter from './views/counter'
import { ErrorBoundary } from './components/ErrorBoundary'

export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        {/* 错误边界 */}
        <Provider store={store}>
          <Counter label={'FCCounterConnected'}></Counter>
        </Provider>
        {/* 错误边界 */}
      </ErrorBoundary>
    )
  }
}
