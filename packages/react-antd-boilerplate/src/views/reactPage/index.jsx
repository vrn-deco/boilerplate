/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-14 11:05:48
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import logo from '@/logo.svg'
import { Button } from 'antd'
import './index.scss'
import store from '@/store'

const storeState = store.getState()

class ReactPage extends Component {
  constructor() {
    super()
    this.jumpPage = this.jumpPage.bind(this)
  }

  jumpPage() {
    this.props.history.push('/login')
  }
  render() {
    console.log(storeState)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Button type="primary" size="large" shape="circle" className="button-transform">
              { storeState.glabelStore.userInfo }
            </Button>
          </p>
          <span className="App-link" onClick={this.jumpPage}>
            Learn React-Antd-Boilerplate
          </span>
        </header>
      </div>
    )
  }
}

export default ReactPage
