import { init } from '@rematch/core'
import promise from 'redux-promise-middleware'
import home from './home'


export default function getStore(initState?:any){
  const store = init({
    models: { home },
    redux: {
      initialState:initState,
      reducers: {},
      middlewares: [promise]
    }
  })
  return store
}
