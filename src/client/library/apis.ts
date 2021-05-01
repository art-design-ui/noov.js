import createInstance from 'art-apis'
import { getTokenKey, getToken, parseQuery, setCookie, unsetCookie } from './utils'

import env from '../config/env'
import serverMap from '../config/apis'

// 整理 apiMap
const apiMap = {}
try {
  const modules = require.context(`../modules`, true, /.*\/apis\.tsx?$/)
  const components = require.context(`../components`, true, /.*\/apis\.tsx?$/)

  modules.keys().forEach((key: string) => {
    const config = modules(key).default
    Object.assign(apiMap, config)
  })

  components.keys().forEach((key: string) => {
    const config = components(key).default
    Object.assign(apiMap, config)
  })
} catch (err) {
  console.error(err.message)
}

// 整理 serverMap
for (const key of Object.keys(serverMap)) {
  let baseURL = serverMap[key].baseMap[env.ENV]
  if (env.ENV === 'dev') {
    baseURL = `${baseURL}${window.CI_DEV_BRANCH}`
  }

  // host
  const dHost = parseQuery('host')
  if (dHost) {
    baseURL = dHost
  }

  serverMap[key].baseURL = baseURL
}

createInstance.useReq((config: any) => {
  let token = getToken()
  const dToken = parseQuery('FC_SESSION')
  if (dToken) {
    token = dToken
    setCookie(getTokenKey(), dToken)
  }

  // clear
  const dClear = parseQuery('clear')
  if (dClear) {
    token = ''
    unsetCookie(getTokenKey())
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    window.router.push('/login')
  }

  return config
})

createInstance.useRes(
  (res: any) => res.data,
  (err: any) => {
    const status = err.response.status
    console.log(err.response)
    if (status) {
      if (status === 401) {
        unsetCookie(getTokenKey())
        window.router.push('/login')
      } else if (status === 403) {
        document.body.innerHTML = '<div>403 您暂无对应权限</div>'
      }
    }
  }
)

const apis = createInstance(serverMap, apiMap)

export default apis
