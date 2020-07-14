/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-14 18:39:33
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RouterView, { history } from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import routeLists from './views/root.routes'
import store from '@/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <RouterView routeLists={routeLists}></RouterView>
        </Router>
      </Provider>
    )
  }
}


export default App
