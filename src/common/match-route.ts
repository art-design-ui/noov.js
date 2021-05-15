import { IRoute } from '@/main/route-config'
import { matchPath } from 'react-router-dom'

export interface IMatchRoute {
  targetRoute: any
  targetMatch: any
}
export default (path: string, routeList: IRoute[]): IMatchRoute => {
  let targetRoute
  let targetMatch

  for (const item of routeList) {
    targetMatch = matchPath(path, item as any)
    if (targetMatch) {
      targetRoute = item // 查找到第一个路由后停止查找
      break
    }
  }
  return { targetRoute, targetMatch }
}
