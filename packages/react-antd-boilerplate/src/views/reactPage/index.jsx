/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-24 15:37:06
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '@/logo.svg'
import { Button, message } from 'antd'
import './index.scss'
import { authAPI } from '@/apis'
import { Debounce, BindSelf } from '@/utils/decorators'
import { myHistory } from '@/store'

class ReactPage extends Component {
  @BindSelf()
  @Debounce()
  async jumpPage() {
    const data = await authAPI.getMock()
    if (data) {
      myHistory('/login')
    } else {
      message.success({
        content: 'mock失败!',
        duration: 1,
        maxCount: 1,
      })
    }
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
