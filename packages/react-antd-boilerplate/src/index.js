/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 09:24:36
 * @LastEditTime: 2020-07-09 15:12:20
 * @Description: react-app入口
 */

import React from 'react'
import ReactDOM from 'react-dom'

// 引入全局scss
import './assets/scss/index.js'

// 引入store
import store from './store'

import App from './App'
import * as serviceWorker from './serviceWorker'

const render = () => {
  /* 废除react严格模式<React.StrictMode></React.StrictMode> */
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

// 渲染初始页面
render()

// 设置store监听函数（当store改变时会自动调用回调函数）
store.subscribe(render)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
