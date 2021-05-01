import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { hot } from 'react-hot-loader/root'

// @ts-ignore
import css from './layout.less'

// @ts-ignore
import withStyles from 'isomorphic-style-loader/withStyles'

class Index extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="layout-box">
        <h1>koa+react+ssr</h1>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(css)(hot(Index))
