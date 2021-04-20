const serverMap: IServerMap = {
  baseServer: {
    baseMap: {
      localprod: '',
      prod: 'https://databank.forchange.cn',
      stage: 'https://stage.pandateacher.com/forchangedata/databank/',
      test: 'https://test.pandateacher.com/forchangedata/databank/',
      dev: 'https://dev.pandateacher.com/forchangedata/databank',
      local: 'http://localhost:4320'
    },
    default: true
  }
}

export default serverMap

interface IBaseMap {
  [key: string]: any
  localprod: string
  prod: string
  stage: string
  test: string
  dev: string
  local: string
}

interface IConfig {
  default?: boolean
  baseURL?: string
  baseMap: IBaseMap
}

interface IServerMap {
  [key: string]: IConfig
}
