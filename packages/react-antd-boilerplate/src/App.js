/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-16 15:21:47
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import RouterView from '@/router'
import { history } from '@/router/history'
import routeList from './views/root.routes'
import store from '@/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RouterView routeList={routeList}></RouterView>
        </ConnectedRouter>
      </Provider>
    )
  }
}


export default App
