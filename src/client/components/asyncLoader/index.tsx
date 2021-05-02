import React from 'react'
import AsyncBundle from '../asyncBundle'
import proConfig from '../../../../config/pro-config'

function AsyncLoader(loader: any) {
  function asyncFn(props: any) {
    return <AsyncBundle load={loader}>{(Comp: any) => <Comp {...props} />}</AsyncBundle>
  }
  // 标记为异步组件
  asyncFn[proConfig.asyncComponentKey] = true

  return asyncFn
}

export default AsyncLoader
