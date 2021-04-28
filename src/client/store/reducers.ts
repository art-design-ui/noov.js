import { init } from '@rematch/core'
import promise from 'redux-promise-middleware'
import home from './home'

const store = init({
  models: { home },
  redux: {
    reducers: {},
    middlewares: [promise]
  }
})

export default store
