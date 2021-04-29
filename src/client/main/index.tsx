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

import getStore from '@/store/reducers'

function renderDom(routeList: any, initStoreState?: any) {
  //  @ts-ignore
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss()) // 客户端执行，插入style
    return () => removeCss.forEach(dispose => dispose()) // 组件卸载时 移除当前的 style 标签
  }
  // !redux数据更新
  const store = getStore(initStoreState)
  // 服务端只需要获取state就行 我们方法的定义在redux就定义好了
  console.log('同步更新的客户端store', store.getState())
  // @ts-ignore
  window.__STORE__ = store
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
  let initialData: any = null
  let initStoreState: any = null
  if (document.getElementById('ssrTextInitData')) {
    // @ts-ignore
    let value = document.getElementById('ssrTextInitData').value
    initialData = JSON.parse(value && value.replace(/\\n/g, ''))
    // @ts-ignore
    window.__INITIAL_DATA__ = initialData || {}
  }

  if (document.getElementById('ssrTextInitStoreData')) {
    // @ts-ignore
    let value = document.getElementById('ssrTextInitStoreData').value
    initStoreState = JSON.parse(value && value.replace(/\\n/g, ''))
  }

  //查找路由
  let matchResult = matchRoute(document.location.pathname, routeList)
  let { targetRoute } = matchResult
  if (targetRoute) {
    //预加载 等待异步脚本加载完成
    if (targetRoute.component[proConfig.asyncComponentKey]) {
      targetRoute
        .component()
        .props.load()
        .then((res: any) => {
          //异步组件加载完成后再渲染页面
          console.log('异步组件加载完成.')
          //设置已加载完的组件，否则需要重新请求
          // targetRoute.component = res ? res.default : null
          renderDom(routeList, initStoreState)
        })
    }
  } else {
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
