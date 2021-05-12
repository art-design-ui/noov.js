import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.less'
import isConnect from '@/library/isConnect'
import Logo from './logo.jpg'

export const Home = () => {
  const handleClick = () => {
    alert('handleClick')
  }

  return (
    <div className="container">
      <div>
        <img src={Logo} alt="" />
        <h1 className="title">noov for ssr</h1>
        <div className="links">
          <a
            href="https://art-design-ui.github.io/noov.js/"
            target="_blank"
            rel="noopener noreferrer"
            className="button--green"
          >
            Documentation
          </a>
          <a
            href="https://github.com/art-design-ui/noov.js"
            target="_blank"
            rel="noopener noreferrer"
            className="button--grey"
          >
            5 GitHub
          </a>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="button--green click-btn"
          onClick={handleClick}
          onKeyDown={handleClick}
        >
          点一点
        </div>
      </div>
    </div>
  )
}
// ! 约定 服务端会调用这个方法  ===> 相当于是生命周期
// 这一块可能会设计到把redux的操作
Home.asyncData = ({ store }: any) => {
  // TODO 在这个生命周期调用getInitialData
  store.dispatch.home.getInitialData()
}

const mapStateToProps = (state: any) => ({
  home: state.home
})

const mapDispatchToProps = () => ({
  getInitialData: (dispatch: any) => {
    dispatch.home.getInitialData()
  }
})

export default isConnect(
  {
    css: style,
    mapStateToProps,
    mapDispatchToProps
  },
  Home
)
