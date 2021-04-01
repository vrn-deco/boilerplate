/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-08-11 16:47:57
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

// 引入store与router的前后顺序，保证在挂在dom时引用的仓库数据字段提前加载
import store from '@/store'
import { history } from '@/router/history'
import RouterView from '@/router'
import routeList from './views/root.routes'

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
