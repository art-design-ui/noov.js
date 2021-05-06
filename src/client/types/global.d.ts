/// <reference path="apis.d.ts" />
import { Store } from "redux";

export {}
declare global {
  interface Window {
    apis: IAPIs
    router: any
    __STORE__: Store
    __INITIAL_DATA__: any
    CI_DEV_BRANCH:string
    ENV:string
    ENV_DOMAIN:string
    CI_APP_NAME:string
    CI_PROJECT_NAMESPACE:string
  }
  namespace NodeJS {
    interface Global {
      __IS_PROD__: string,
      __dynamics_route_to_static:any[]
    }
  }
}
