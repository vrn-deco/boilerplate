/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 17:02:40
 * @LastEditTime: 2020-07-14 11:32:38
 * @Description: 主页面
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { RouterView } from './router'
import routeLists from './views/root.routes'
import store from './store'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <RouterView routeLists={routeLists}></RouterView>
        </Provider>
      </div>
    )
  }
}



export default App
