/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-12 13:53:54
 * @Description: react-antd-boilerplate先导页
 */

import React, { Component } from 'react'
import logo from '@/logo.svg'
import { Button } from 'antd'
import '@/assets/scss/reactPage.scss'

class ReactPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Button type="primary" size="large" shape="circle" className="button-transform">
              VRN
            </Button>
          </p>
          <a
            className="App-link"
            href="https://github.com/Cphayim/boilerplate/tree/dev_yugestrive/packages/react-antd-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React-Antd-Boilerplate
          </a>
        </header>
      </div>
    )
  }
}

export default ReactPage
