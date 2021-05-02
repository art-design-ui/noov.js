const routes: any[] = []

try {
  const context = require.context(`../modules`, true, /.*\/routes\.tsx?$/)
  context.keys().forEach((key: string) => {
    const route = context(key).default
    routes.push(route)
  })
} catch (err) {
  console.warn(err.message)
}

console.log('>>> routes: ', JSON.stringify(routes))

export default routes
