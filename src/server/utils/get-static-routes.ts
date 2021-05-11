// 路由静态化处理

import { IRoute } from '@/main/route-config'
import proConfig from '../../../config/pro-config'

const checkIsAsyncRoute = (component:any) => {
  return component && component[proConfig.asyncComponentKey]
}

// 将路由转换为静态路由
async function getStaticRoutes(routes:IRoute[]) {
  const key = '__dynamics_route_to_static'
  if (global[key]) {
    return global[key]
  }

  const len = routes.length
  let i = 0
  const staticRoutes = []

  for (; i < len; i++) {
    const item = routes[i]
    if (checkIsAsyncRoute(item.component)) {
      staticRoutes.push({
        ...item,
        ...{
          component: (await item.component().props.load()).default
        }
      })
    } else {
      staticRoutes.push({
        ...item
      })
    }
  }
  global[key]  = staticRoutes
  return staticRoutes // 返回静态路由
}

export default getStaticRoutes
