import * as React from 'react'
import { withRouter } from 'react-router-dom'

const Home = withRouter(React.lazy(() => import('./index')))

export default [
  {
    path: '/',
    component: () => <Home />
  }
]
