import React from 'react'

export interface IRoute {
  path: string
  component: Function
  exact: boolean
}

let routes: IRoute[] = []

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
try {
  if (__IS_WEBPACK__) {
    const context = require.context(`../modules`, true, /.*\/routes\.tsx?$/)
    context.keys().forEach((key: string) => {
      const route = context(key).default
      routes = routes.concat(route)
    })
  }
} catch (err) {
  console.warn(err.message)
}
routes.push({
  path: '*',
  component: pageNotFound,
  exact: true
})

console.log('>>> routes: ', JSON.stringify(routes))
export default routes
