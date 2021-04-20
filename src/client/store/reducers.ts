import { init } from '@rematch/core'
import promise from 'redux-promise-middleware'

const store = init({
  models: {},
  redux: {
    reducers: {},
    middlewares: [promise]
  }
})

export default store
