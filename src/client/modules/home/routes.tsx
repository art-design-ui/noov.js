import * as React from 'react'
import { withRouter } from 'react-router-dom'

import Home from './index'

function pageNotFound({staticContext}:any) {
  if(staticContext){
      staticContext.code=404;
  }

  return <div>404页面</div>
}
export default [
  {
    path: '/',
    component: () => <Home />,
    exact:true
  },
  {
    path: '*',
    component: pageNotFound,
    // exact: true
  }
]
