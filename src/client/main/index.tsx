import { createHashHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import apis from '../library/apis'
import sensors from '../library/sensors'

window.apis = apis
window.sensors = sensors
window.router = createHashHistory()
ReactDOM.render(<App />, document.getElementById('app'))
