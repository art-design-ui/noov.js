import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux'
import getStore from '@/store/reducers'
import App from './router'
import routeList, { IRoute } from './route-config'
import matchRoute from '../../common/match-route'
import proConfig from '../../../config/pro-config'
import { Store } from 'redux'

function renderDom(routeList: IRoute[], initStoreState?: Store) {
  const insertCss = (...styles: any[]) => {
    const removeCss = styles.map(style => style._insertCss()) // 客户端执行，插入style
    return () => removeCss.forEach(dispose => dispose()) // 组件卸载时 移除当前的 style 标签
  }
  // redux数据更新
  const store = getStore(initStoreState)
  // 服务端只需要获取state就行 我们方法的定义在redux就定义好了
  window.__STORE__ = store
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

function clientRender(routeList: IRoute[]) {
  let initialData: any = null
  let initStoreState: Store | undefined
  const textDom = document.getElementById('ssrTextInitData') as HTMLTextAreaElement | null
  const storeDom = document.getElementById(
    'ssrTextInitStoreData'
  ) as HTMLTextAreaElement | null
  if (textDom) {
    const { value } = textDom
    initialData = value && JSON.parse(value.replace(/\\n/g, ''))
    window.__INITIAL_DATA__ = initialData || {}
  }

  if (storeDom) {
    const { value } = storeDom
    initStoreState = value && JSON.parse(value.replace(/\\n/g, ''))
  }

  // 查找路由
  const matchResult = matchRoute(document.location.pathname, routeList)
  const { targetRoute } = matchResult
  if (targetRoute) {
    // 预加载 等待异步脚本加载完成
    if (targetRoute.component[proConfig.asyncComponentKey]) {
      targetRoute
        .component()
        .props.load()
        .then(() => {
          // 异步组件加载完成后再渲染页面
          // 设置已加载完的组件，否则需要重新请求
          renderDom(routeList, initStoreState)
        })
    }
  } else {
    renderDom(routeList)
  }
}

// 渲染入口
clientRender(routeList)

// 开发环境才会开启
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}
