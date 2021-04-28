//异步加载组件的高阶函数

import AsyncBundle from '../asyncBundle'
// @ts-ignore
import proConfig from '../../../common/pro-config.js'
import React from 'react'
function AsyncLoader(loader: any) {
  function asyncFn(props: any) {
    return <AsyncBundle load={loader}>{(Comp: any) => <Comp {...props} />}</AsyncBundle>
  }

  //标记为异步组件
  // @ts-ignore
  asyncFn[proConfig.asyncComponentKey] = true

  return asyncFn
}

export default AsyncLoader
