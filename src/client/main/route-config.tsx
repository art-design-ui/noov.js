import React from 'react'
export interface IRoute{
  path:string
  component: Function
  exact:boolean
}

let routes: IRoute[] = []

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
try {
  if (require.context) {
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
