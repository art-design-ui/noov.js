import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux'
import routeList from '../../client/main/route-config'
import matchRoute from '../../common/match-route'

import getStaticRoutes from '../utils/get-static-routes'

import proConfig from '../../../config/pro-config'

import getAssets from '../utils/assets'
// css 同构的上下文

import getStore from '../../client/store/reducers'

const store = getStore()

console.log('store', store)

// 得到 store,默认没有数据

export default async (ctx: any, next: any) => {
  const { path } = ctx.request

  if (path.indexOf('.') > -1) {
    ctx.body = null
    return next()
  }
  // 获得静态路由
  const staticRoutesList = await getStaticRoutes(routeList)

  // 查找到的目标路由对象
  const matchResult = await matchRoute(path, staticRoutesList)
  const { targetRoute, targetMatch } = matchResult

  // 进行数据预取，更新 store 内的数据
  let fetchDataFn
  let fetchResult = {}
  if (targetRoute) {
    fetchDataFn = targetRoute.component ? targetRoute.component.getInitialProps : null
    if (fetchDataFn) {
      fetchResult = await fetchDataFn({ store }) // 更新 state
    }
  }

  const { page } = fetchResult || {}

  let tdk = {
    title: '默认标题 - my react ssr',
    keywords: '默认关键词',
    description: '默认描述'
  }

  if (page && page.tdk) {
    tdk = page.tdk
  }

  // 将预取数据在这里传递过去 组内通过props.staticContext获取
  const context = {
    initialData: fetchResult
  }
  // ! 为什么要直接插入 不单独引入一份css  因为这样你就不用多请求一个了
  const cssObj = new Set() // CSS for all rendered React components
  const insertCss = (...styles: any) =>
    styles.forEach((style: any) => cssObj.add(style._getContent()))
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <StyleContext.Provider value={{ insertCss }}>
          <App routeList={staticRoutesList} />
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>
  )

  const styles: string[] = []
  ;[...cssObj].forEach(item => {
    const [mid, content] = item[0]
    styles.push(`<style id="s${mid}-0">${content}</style>`)
  })

  // 静态资源
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
          ${JSON.stringify(fetchResult || {})}
          </textarea>
          <textarea id="ssrTextInitStoreData" style="display:none;">
          ${JSON.stringify(store.getState() || {})}
          </textarea>
      </body>
      </html>
      <script>
      window.__IS__SSR__=${proConfig.__IS_SSR__};
      </script>
      ${assetsMap.js.join('')}
      `
  await next()
}
