import Layout from './layout'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

const App = ({ routeList }: any) => (
  <Layout>
    <Switch>
      {routeList.map((item: any) => (
        <Route key={item.path} {...item} />
      ))}
    </Switch>
  </Layout>
)

export default App
