/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-12 11:59:56
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import RouterView from './router'
import routeLists from './views/router'

class App extends Component {
  render() {
    return (
      <div>
        <Router history={createBrowserHistory()}>
          <RouterView routeLists={routeLists}></RouterView>
        </Router>
      </div>
    )
  }
}

export default App
