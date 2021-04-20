import React from 'react'
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import PageLoading from '../components/pageLoading'

let routes: any[] = []

try {
  const context = require.context(`../modules`, true, /.*\/routes\.tsx?$/)
  context.keys().forEach((key: string) => {
    const route = context(key).default
    routes = routes.concat(route)
  })
} catch (err) {
  console.warn(err.message)
}

routes.push({
  path: '/',
  redirect: '/databank/center'
})

console.log('>>> routes: ', JSON.stringify(routes))

class SwitchRouterComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  componentDidUpdate(prevProps: any): void {
    if (this.props.location !== prevProps.location) {
      console.log('>>> Router Change: ', this.props.location)
    }
  }

  render(): JSX.Element {
    return (
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          {routes.map((route, index) =>
            route.redirect ? (
              <Redirect exact key={index} from={route.path} to={route.redirect} />
            ) : (
              <Route
                key={index}
                path={route.path}
                exact={false}
                component={route.component}
              />
            )
          )}
        </Switch>
      </React.Suspense>
    )
  }
}

const WithRouterComponent = withRouter(SwitchRouterComponent)

/* eslint-disable */
class RouterComponent extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <HashRouter>
        <WithRouterComponent />
      </HashRouter>
    )
  }
}

export default hot(RouterComponent)
