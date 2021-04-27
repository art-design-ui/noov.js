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

function renderDom(routeList: any) {
        console.log('渲染index')
        // 渲染index
        // @ts-ignore
        const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
        console.log('routeList===>',routeList)
        renderMethod(
                <BrowserRouter>
                        <App routeList={routeList} />
                </BrowserRouter>,
                document.getElementById('app'),
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
        console.log('matchResult',matchResult)
        let { targetRoute } = matchResult
        console.log('targetRoute===>', targetRoute)
        if (targetRoute) {
                //预加载 等待异步脚本加载完成
                // if (targetRoute.component[proConfig.asyncComponentKey]) {
                // targetRoute
                //         .component()
                //         .then((res: any) => {
                //                 //异步组件加载完成后再渲染页面
                //                 console.log('异步组件加载完成.')
                //设置已加载完的组件，否则需要重新请求
                // targetRoute.component = res ? res.default : null
                renderDom(routeList)
                // })
                // }
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
