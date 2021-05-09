import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.less'
import isConnect from '@/library/isConnect'

export const Home = () => {
  const handleClick = () => {
    alert('handleClick')
  }

  return (
    <div className="home">
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>click me1的顶顶顶顶顶的</button>
      {[22, 44, 55, 300, 100, 201].map((item: number) => (
        <div key={item}>{item}</div>
      ))}
      <p>11</p>
      <Link to="/history">404 page</Link>
    </div>
  )
}
// ! 约定 服务端会调用这个方法  ===> 相当于是生命周期
// 这一块可能会设计到把redux的操作
Home.getInitialProps = ({ store }: any) => {
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
