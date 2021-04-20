/// <reference path="./apis-keys.d.ts" />

// 请求响应
interface IResponse<T = any> {
  errcode: number
  errmsg: string
  data: T
}

// 请求调用
interface IAPIsTransferParam {
  url?: string
  baseURL?: string
  headers?: any
  params?: any
  data?: any
  rest?: { [key: string]: number | string }

  paramsSerializer?: (params: any) => string
  onUploadProgress?: (progressEvent: any) => void
  onDownloadProgress?: (progressEvent: any) => void
}

// 请求注册
interface IAPIsRegisterParam {
  [key: string]: {
    server?: string
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
  }
}

// 请求
type APICall = <T extends any>(params?: IAPIsTransferParam) => Promise<IResponse<T>>

// 定义 key
type ValuesOf<T extends any[]> = T[number]
type APIKeys = ValuesOf<typeof keys>

type IAPIs = {
  [key in APIKeys]: APICall
}
