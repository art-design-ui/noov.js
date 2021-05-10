import React from 'react'

let routes: any[] = []
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
try {
  const context = require.context(`../modules`, true, /.*\/routes\.tsx?$/)
  context.keys().forEach((key: string) => {
    const route = context(key).default
    routes = routes.concat(route)
  })
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
