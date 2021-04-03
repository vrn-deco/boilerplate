/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-08-07 17:06:05
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '@/logo.svg'
import { Button } from 'antd'
import './index.scss'
import { Debounce, BindSelf, Lock } from '@/utils/decorators'
import { GlabelStore } from '@/store/glabel.store.js'

class ReactPage extends Component {
  @BindSelf()
  @Debounce()
  jumpPage() {
    this.props.fetchUser({ type: 'haha' })
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

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (...arg) => dispatch(GlabelStore.action.fetchUser(...arg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReactPage)
