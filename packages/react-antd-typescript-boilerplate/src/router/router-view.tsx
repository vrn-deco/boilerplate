import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { history } from './history'

interface Props {
  routes: Array<{ path: string; component: any }>
}

export default function RouterView({ routes }: Props) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route) => (
          <Route path={route.path} exact component={route.component} key={route.path} />
        ))}
        <Route path="*">404</Route>
      </Switch>
    </ConnectedRouter>
  )
}
