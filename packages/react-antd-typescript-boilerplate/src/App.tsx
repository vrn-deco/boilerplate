/*
 * @Author: Cphayim
 * @Date: 2019-08-28 17:22:39
 * @LastEditTime: 2020-07-15 10:25:36
 * @Description: 入口组件
 */

import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { ErrorBoundary } from '@/components/ErrorBoundary'

import Counter from '@/views/counter/counter'

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
