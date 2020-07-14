/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 09:24:36
 * @LastEditTime: 2020-07-14 11:34:12
 * @Description: react-app入口
 */

import React from 'react'
import ReactDOM from 'react-dom'

// 引入全局scss
import './assets/scss/all.scss'
import store from './store'

import App from './App'
import * as serviceWorker from './serviceWorker'

/* 废除react严格模式<React.StrictMode></React.StrictMode> */
function renderDom() {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderDom()
store.subscribe(renderDom)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
