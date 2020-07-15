/*
 * @Author: Cphayim
 * @Date: 2020-07-14 15:52:34
 * @LastEditTime: 2020-07-16 00:26:53
 * @Description: 入口组件
 */
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { RouterView, routes } from '@/router'

import '@/App.scss'

export default function App() {
  return (
    <Provider store={store}>
      {/* <Counter label="label"></Counter> */}
      <RouterView routes={routes}></RouterView>
    </Provider>
  )
}
