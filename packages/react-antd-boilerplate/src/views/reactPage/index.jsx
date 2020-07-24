/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-24 17:26:31
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '@/logo.svg'
import { Button, message } from 'antd'
import './index.scss'
import { authAPI } from '@/apis'
import { Debounce, BindSelf, Lock } from '@/utils/decorators'

class ReactPage extends Component {
  @BindSelf()
  @Debounce()
  async jumpPage() {
    const data = await authAPI.getMock()
    if (data) {
      this.props.history.push('/login')
    } else {
      message.success({
        content: 'mock失败!',
        duration: 1,
        maxCount: 1,
      })
    }
  }

  
  @BindSelf()
  @Lock()
  async handleClick() {
    const res = await this.fetch()
    console.log(res)
  }

  async fetch() {
    return new Promise((s, j) => {
      setTimeout(() => {
        s(10)
      }, 1000)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Button
              type="primary"
              size="large"
              shape="circle"
              className="button-transform"
              onClick={this.handleClick}
            >
              {this.props.userInfo}
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

const mapStateToProps = (state) => ({
  userInfo: state.glabelStore.userInfo,
})

export default connect(mapStateToProps)(ReactPage)
