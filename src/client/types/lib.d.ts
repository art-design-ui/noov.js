declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}
declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.json' {
  const jsonValue: any
  export default jsonValue
}

declare module 'isomorphic-style-loader/StyleContext'

declare module 'isomorphic-style-loader/withStyles'

declare const __SERVER__: boolean

declare const __IS_PROD__: boolean

declare const __IS_WEBPACK__: boolean
