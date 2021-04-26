import { createHashHistory } from 'history'
import React from 'react'

import App from './app'
import apis from '../library/apis'
import sensors from '../library/sensors'

import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from './route-config'
// @ts-ignore
import matchRoute from '../../share/match-route';
// @ts-ignore
import proConfig from '../../share/pro-config';


window.apis = apis
window.sensors = sensors
window.router = createHashHistory()

console.log('routes',routes)

function renderDom(routes:any) {
        //渲染index
        ReactDom.hydrate(<BrowserRouter>
                <App />
        </BrowserRouter>
                , document.getElementById('root'))
}

function clientRender(routes:any) {
  if(document.getElementById('ssrTextInitData')){
    let value = document.getElementById('ssrTextInitData').value
    let initialData = JSON.parse(value&&value.replace(/\\n/g,''));
    window.__INITIAL_DATA__ = initialData || {};
}

        //查找路由
        // let matchResult = matchRoute(document.location.pathname, routes);
        // let { targetRoute } = matchResult;
        // if (targetRoute) {
        //         //预加载 等待异步脚本加载完成
        //         if (targetRoute.component[proConfig.asyncComponentKey]) {
        //                 targetRoute.component().props.load().then((res:any) => {
        //                         //异步组件加载完成后再渲染页面
        //                         console.log('异步组件加载完成.');
        //                         //设置已加载完的组件，否则需要重新请求
        //                         targetRoute.component = res?res.default:null;
        //                         renderDom(routes);
        //                 });
        //         }

        // } else {
                renderDom(routes);
        // }
}

//渲染入口
clientRender(routes);

//开发环境才会开启
// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
        // @ts-ignore
        module.hot.accept();
}