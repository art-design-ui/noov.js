import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import routeList from '../../client/main/route-config'
import { Provider } from 'react-redux'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import getStaticRoutes from '../utils/get-static-routes'
import matchRoute from '../../common/match-route'
import App from '../../client/main/router'
import { Store } from 'redux'

interface IGenResult {
  html: string
  fetchResult:any
}
export default async function genHtml(
  path: string,
  insertCss: Function,
  store: Store
): Promise<IGenResult> {
  // 获得静态路由
  const staticRoutesList = await getStaticRoutes(routeList)

  // 查找到的目标路由对象
  const matchResult = await matchRoute(path, staticRoutesList)
  const { targetRoute } = matchResult

  // 进行数据预取，更新 store 内的数据
  let fetchDataFn
  let fetchResult= {}
  if (targetRoute) {
    fetchDataFn = targetRoute.component ? targetRoute.component.getInitialProps : null
    if (fetchDataFn) {
      // 更新 state
      fetchResult = await fetchDataFn({ store })
    }
  }

  // 将预取数据在这里传递过去 组内通过props.staticContext获取 IntrinsicAttributes 
  const context: any= {
    initialData: fetchResult
  }
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <StyleContext.Provider value={{ insertCss }}>
          <App routeList={staticRoutesList} />
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>
  )
  return {
    html,
    fetchResult
  }
}
