import React from 'react'
import AsyncLoader from '@/components/asyncLoader'

// 这种不能被做到热更新 那么应该reload啊
// todo 这里有bug
function pageNotFound({ staticContext }: any) {
  if (staticContext) {
    staticContext.code = 404
  }

  return (
    <div>
      <p>404页面page22</p>
      <p>12</p>
    </div>
  )
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
    exact: true
  }
]
