/*
 * @Autor: yugeStrive
 * @Date: 2020-07-07 08:51:44
 * @LastEditTime: 2020-07-21 14:26:41
 * @Description: 登录页
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { authAPI } from '@/apis'
import './index.scss'
import { GlabelStore } from '@/store/glabel.store'
import { Debounce } from '@/utils/decorators'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
}

class Login extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  @Debounce()
  async handleSubmit(e) {
    let config = {
      data: {
        username: e.username,
        pwd: e.password,
      },
    }
    let res = await authAPI.login(config.data)
    const { name } = res.data.user
    // 登录成功后的操作
    this.props.setUserInfo(name)
    message.success({
      content: 'Welcome to system!',
      duration: 1,
      maxCount: 1,
    })
  }
  render() {
    return (
      <div className="loginPage">
        <div className="login_wrap">
          <h2 className="title">{this.props.userInfo}</h2>
          <div className="login-content">
            <Form {...layout} onFinish={this.handleSubmit} className="login-from">
              <Form.Item
                label="username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  placeholder="username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }}></Icon>}
                />
              </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  type="password"
                  placeholder="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
                <span className="login-form-forgot">Forgot password</span>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.glabelStore.userInfo,
})

const mapDispatchToProps = {
  ...GlabelStore.action,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
