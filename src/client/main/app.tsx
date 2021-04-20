import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from '@store/reducers'
import './../style/reset.css'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <RouterComponent />
        </Provider>
      </ConfigProvider>
    )
  }
}

export default hot(App)
