import React from 'react'
import { renderToString } from 'react-dom/server'

import { StaticRouter, Route, matchPath } from 'react-router'
// import { renderRoutes } from 'react-router-config';

// import Layout from '../../client/app/layout';//如果有 layout 组件，也需要一起转换为 html

import routeList from '../../client/main/route-config'

//自定义 provider 用来传递数据
// import Provider from '../../client/app/provider';

import matchRoute from '../../common/match-route'

import App from '../../client/main/router'

import getStaticRoutes from '../utils/get-static-routes'

import proConfig from '../../common/pro-config'

import getAssets from '../utils/assets'
//css 同构的上下文
import StyleContext from 'isomorphic-style-loader/StyleContext'

export default async (ctx, next) => {
  console.log(process.env.NODE_ENV)
  console.log(typeof process.env.NODE_ENV)
  console.log(__IS_PROD__)
  console.log(typeof __IS_PROD__)
  console.log('====')
  const path = ctx.request.path

  if (path.indexOf('.') > -1) {
    ctx.body = null
    return next()
  }

  console.log('ctx.request.path', ctx.request.path)

  //获得静态路由
  const staticRoutesList = await getStaticRoutes(routeList)

  //查找到的目标路由对象
  let matchResult = await matchRoute(path, staticRoutesList)
  let { targetRoute, targetMatch } = matchResult

  //得到数据
  let fetchDataFn,
    fetchResult = {}
  if (targetRoute) {
    fetchDataFn = targetRoute.component ? targetRoute.component.getInitialProps : null
    if (fetchDataFn) {
      fetchResult = await fetchDataFn()
    }
  }

  let { page } = fetchResult || {}

  let tdk = {
    title: '默认标题 - my react ssr',
    keywords: '默认关键词',
    description: '默认描述'
  }

  if (page && page.tdk) {
    tdk = page.tdk
  }

  //将预取数据在这里传递过去 组内通过props.staticContext获取
  const context = {
    initialData: fetchResult
  }
  // ! 为什么要直接插入 不单独引入一份css  因为这样你就不用多请求一个了
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()))

  const html = renderToString(
    <StaticRouter location={path} context={context}>
      <StyleContext.Provider value={{ insertCss }}>
        <App routeList={staticRoutesList}></App>
      </StyleContext.Provider>
    </StaticRouter>
  )

  const styles = []
  ;[...css].forEach(item => {
    let [mid, content] = item[0]
    styles.push(`<style id="s${mid}-0">${content}</style>`)
  })

  //静态资源
  const assetsMap = getAssets()

  ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
    ${styles.join('')}
</head>
<body>
    <div id="app">
       ${html}
    </div>
    <textarea id="ssrTextInitData" style="display:none;">
    ${JSON.stringify(fetchResult)}
    </textarea>
</body>
</html>
 ${assetsMap.js.join('')}
`

  await next()
}
