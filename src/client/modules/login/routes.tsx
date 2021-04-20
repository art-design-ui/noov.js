import * as React from 'react'
import { withRouter } from 'react-router-dom'
import Login from './pages/login'

export default [
  {
    path: '/login',
    component: () => <Login />
  }
]
