/** @format */
//client/app/index.js
//浏览器端页面结构渲染入口

import React from 'react'
import ReactDOM from 'react-dom'
import App from './router'
import { BrowserRouter } from 'react-router-dom'
import routeList from './route-config'
// @ts-ignore
import matchRoute from '../../common/match-route'
// @ts-ignore
import proConfig from '../../common/pro-config'
//  @ts-ignore
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux'

import store from '@/store/reducers'

function renderDom(routeList: any) {
  //  @ts-ignore
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss()) // 客户端执行，插入style
    return () => removeCss.forEach(dispose => dispose()) // 组件卸载时 移除当前的 style 标签
  }
  // 渲染index
  // @ts-ignore
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <StyleContext.Provider value={{ insertCss }}>
          <App routeList={routeList} />
        </StyleContext.Provider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
}

function clientRender(routeList: any) {
  if (document.getElementById('ssrTextInitData')) {
    // @ts-ignore
    let value = document.getElementById('ssrTextInitData').value
    let initialData = JSON.parse(value && value.replace(/\\n/g, ''))
    // @ts-ignore
    window.__INITIAL_DATA__ = initialData || {}
  }

  //查找路由
  let matchResult = matchRoute(document.location.pathname, routeList)
  let { targetRoute } = matchResult
  if (targetRoute) {
    //预加载 等待异步脚本加载完成
    if (targetRoute.component[proConfig.asyncComponentKey]) {
      console.log('targetRoute===>', targetRoute)
      targetRoute
        .component()
        .props.load()
        .then((res: any) => {
          //异步组件加载完成后再渲染页面
          console.log('异步组件加载完成.')
          //设置已加载完的组件，否则需要重新请求
          // targetRoute.component = res ? res.default : null
          renderDom(routeList)
        })
    }
  } else {
    console.log('renderDom==>', renderDom)
    renderDom(routeList)
  }
}

//渲染入口
clientRender(routeList)

//开发环境才会开启
// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
  // @ts-ignore
  module.hot.accept()
}
