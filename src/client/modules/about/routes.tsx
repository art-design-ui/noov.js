import React from 'react'
import AsyncLoader from '@/components/asyncLoader'

export default [
  {
    path: '/about',
    component: AsyncLoader(() => import('./index')),
    exact: true
  }
]
