import { matchPath } from 'react-router-dom'

export interface IMatchRoute {
  targetRoute: any
  targetMatch: any
}
export default (path: string, routeList: any[]): IMatchRoute => {
  let targetRoute
  let targetMatch

  for (const item of routeList) {
    targetMatch = matchPath(path, item)
    if (targetMatch) {
      targetRoute = item // 查找到第一个路由后停止查找
      break
    }
  }
  return { targetRoute, targetMatch }
}
