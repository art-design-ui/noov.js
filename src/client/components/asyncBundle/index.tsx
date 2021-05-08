import React from 'react'
import LoadingCompoent from '../loading'

/**
 * 动态加载组件一个组的容器
 *
 * @class Bundle
 * @extends {Component}
 */

interface IPops {
  children: any
  load: any
}

interface IState {
  mod?: any
}
export default class AsyncBundle extends React.PureComponent<IPops, IState> {
  state = {
    mod: null
  }

  componentDidMount() {
    const { mod } = this.state
    if (!mod) {
      this.load(this.props)
    }
  }

  load(props: any) {
    this.setState({
      mod: null
    })
    props.load().then((mod: any) => {
      this.setState({
        // import()加载模块成功以后 值的获取是通过default属性
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    const { mod } = this.state
    const { children } = this.props
    return mod ? children(mod) : <LoadingCompoent />
  }
}
