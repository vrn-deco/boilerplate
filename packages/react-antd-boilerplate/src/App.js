/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-13 17:06:13
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { RouterView } from './router'
import routeLists from './views/root.routes'

class App extends Component {
  render() {
    return (
      <div>
        <RouterView routeLists={routeLists}></RouterView>
      </div>
    )
  }
}

export default App
