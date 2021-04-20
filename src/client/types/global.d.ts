/// <reference path="apis.d.ts" />

interface Window {
  apis: IAPIs
  router: any
  sensors: {
    tracks(eventName: string, eventOptions: { [key: string]: any }): void
  }
}
