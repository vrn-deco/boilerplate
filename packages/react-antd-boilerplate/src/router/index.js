/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-14 16:24:45
 * @Description: 全局路由跳转方式
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import config from '@/config'

export const history = createBrowserHistory()

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
            <Redirect from="/*" to={config.UNAUTHORIZED_REDIRECT_PATH} />
          </Switch>
      </div>
    )
  }
}

export default withRouter(RouterView)
