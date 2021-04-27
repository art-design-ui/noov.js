// src/client/router/indxex.js
//路由配置文件


import Layout from './layout';

import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

function App({ routeList }: any) {
    return (
        <Layout>
            <Switch>
                {
                    routeList.map((item: any) => {
                        return <Route key={item.path} {...item} />
                    })
                }
            </Switch>
        </Layout>
    );
}

export default App;