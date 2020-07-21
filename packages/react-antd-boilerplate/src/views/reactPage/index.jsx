/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-21 13:48:58
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '@/logo.svg'
import { Button } from 'antd'
import './index.scss'

class ReactPage extends Component {
  constructor() {
    super()
    this.jumpPage = this.jumpPage.bind(this)
  }

  jumpPage() {
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Button type="primary" size="large" shape="circle" className="button-transform">
              { this.props.userInfo }
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

const mapStateToProps = state => ({
  userInfo: state.glabelStore.userInfo
})

export default connect(mapStateToProps)(ReactPage)
