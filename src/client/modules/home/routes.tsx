import AsyncLoader from '@/components/asyncLoader'
import React from 'react'

// TODO 不支持热更新
function pageNotFound({ staticContext }: any) {
  if (staticContext) {
    staticContext.code = 404
  }

  return (
    <div>
      <p>404页面</p>
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
