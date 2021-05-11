import React from 'react'
import AsyncBundle from '../asyncBundle'
import proConfig from '../../../../config/pro-config'

interface IProps {}
export type ILoader = () => Promise<any>
function AsyncLoader(loader: ILoader) {
  const asyncFn: any = (props: IProps) => (
    <AsyncBundle load={loader}>
      {(Comp: typeof React.Component) => <Comp {...props} />}
    </AsyncBundle>
  )
  // 标记为异步组件
  asyncFn[proConfig.asyncComponentKey] = true

  return asyncFn
}

export default AsyncLoader
