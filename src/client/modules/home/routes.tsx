import * as React from 'react'
import AsyncLoader from '@/components/asyncLoader';


function pageNotFound({ staticContext }: any) {
  if (staticContext) {
    staticContext.code = 404;
  }

  return <div>404页面</div>
}
export default [
  {
    path: '/',
    component: AsyncLoader(() => import('./index')),
    exact: true
  },
  {
    path: '*',
    component: pageNotFound,
    // exact: true
  }
]
