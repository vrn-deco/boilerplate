/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-14 16:31:08
 * @Description: 主页面
 */

import React, { Component } from 'react'
import RouterView, { history } from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import routeLists from './views/root.routes'

class App extends Component {
  componentDidMount() {
    console.log(this.context, 'app')
  }
  render() {
    return (
      <Router history={history}>
        <RouterView routeLists={routeLists}></RouterView>
      </Router>
    )
  }
}

export default App
