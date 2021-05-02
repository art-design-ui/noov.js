import React from 'react'
import { hot } from 'react-hot-loader/root'

import css from './layout.less'

import withStyles from 'isomorphic-style-loader/withStyles'

interface Istate {}

interface IProps {}
class Index extends React.PureComponent<Istate, IProps> {
  render() {
    const { children } = this.props
    return (
      <div className="layout-box">
        <h1>koa+react+ssr</h1>
        {children}
      </div>
    )
  }
}

export default withStyles(css)(hot(Index))
