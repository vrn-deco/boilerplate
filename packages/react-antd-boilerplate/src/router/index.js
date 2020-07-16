/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-16 15:21:29
 * @Description: 全局路由跳转方式
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import config from '@/config'

class RouterView extends Component {
  render() {
    return (
      <div>
          <Switch>
            {this.props.routeList.map((item) => {
              return (
                <Route
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                  key={item.component}
                />
              )
            })}
            <Redirect from="/*" to={config.SERVICES.UNAUTHORIZED_REDIRECT_PATH} />
          </Switch>
      </div>
    )
  }
}

export default RouterView
