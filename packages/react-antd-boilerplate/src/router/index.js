/*
 * @Author: yugeStrive
 * @Date: 2020-07-12 10:22:30
 * @LastEditTime: 2020-07-13 17:05:56
 * @Description: 全局路由跳转方式
 */

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import config from '@/config'

export const history = createBrowserHistory()

export class RouterView extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
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
        </Router>
      </div>
    )
  }
}
