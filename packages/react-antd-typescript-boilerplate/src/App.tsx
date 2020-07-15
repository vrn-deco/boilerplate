/*
 * @Author: Cphayim
 * @Date: 2020-07-14 15:52:34
 * @LastEditTime: 2020-07-15 15:56:57
 * @Description: 入口组件
 */
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import routes from '@/router/routes'

import '@/App.scss'
import RouterView from './router/router-view'

export default function App() {
  return (
    <Provider store={store}>
      {/* <Counter label="label"></Counter> */}
      <RouterView routes={routes}></RouterView>
    </Provider>
  )
}
