import * as React from 'react'
import { withRouter } from 'react-router-dom'

import Home from './index'
export default [
  {
    path: '/',
    component: () => <Home />
  }
]
