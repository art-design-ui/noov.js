import AsyncLoader from '@/components/asyncLoader'


export default [
  {
    path: '/',
    component: AsyncLoader(() => import('./index')),
    exact: true
  }
]
