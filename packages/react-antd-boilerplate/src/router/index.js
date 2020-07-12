/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-12 11:02:38
 * @Description: 全局路由跳转方式
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

class RouterView extends Component {
  render() {
    return (
      <div>
        <Switch>
          {this.props.routeLists.map((item) => {
            return (
              <Route
                exact={item.exact}
                path={item.path}
                component={item.component}
                key={item.component}
              />
            )
          })}
        </Switch>
      </div>
    )
  }
}

export default RouterView
