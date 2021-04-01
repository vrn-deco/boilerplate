/*
 * @Author: Cphayim
 * @Date: 2019-08-28 17:22:39
 * @LastEditTime: 2019-09-16 14:57:40
 * @Description: 应用入口
 */

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '@/serviceWorker'

import '@/index.css'
import App from '@/App'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
