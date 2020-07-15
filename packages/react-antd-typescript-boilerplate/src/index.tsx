/*
 * @Author: Cphayim
 * @Date: 2020-07-14 15:52:34
 * @LastEditTime: 2020-07-16 00:02:47
 * @Description: 应用入口
 */
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '@/serviceWorker'

// 全局样式
import '@/assets/scss/all.scss'

import App from '@/App'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
