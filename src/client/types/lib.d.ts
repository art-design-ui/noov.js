interface Sensors {
  init(config: any): void
  track(eventName: string, eventOption: { [key: string]: any }): void
  login(id?: number | string): void
  quick(key: string): void
}

interface CusSensors extends Sensors {
  tracks: (eventName: string, eventOption: { [key: string]: any }) => void
}

declare module 'sa-sdk-javascript' {
  const sensors: CusSensors
  export default sensors
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.json' {
  const jsonValue: any
  export default jsonValue
}

declare module 'isomorphic-style-loader/StyleContext'

declare module 'isomorphic-style-loader/withStyles'
