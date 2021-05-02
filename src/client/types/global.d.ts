/// <reference path="apis.d.ts" />

import { Store } from 'redux'

declare global {
  interface Window {
    apis: IAPIs
    router: any
    sensors: {
      tracks(eventName: string, eventOptions: { [key: string]: any }): void
    }
    __STORE__: Store
    __INITIAL_DATA__: any
  }
}
