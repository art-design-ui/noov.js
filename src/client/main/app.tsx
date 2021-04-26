import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from '@store/reducers'
import './../style/reset.css'


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render(): JSX.Element {
    return ( 
        <Provider store={store}>
          <RouterComponent />
        </Provider>
    )
  }
}

export default App