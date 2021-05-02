import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import css from './index.less'
import isConnect from '@/library/isConnect'

export const Home = (props: any) => {
  const handleClick = () => {
    window.alert('handleClick')
  }

  return (
    <div className="home">
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>click me1的顶顶顶顶顶的</button>
      {[111, 2, 3, 4, 5, 6111, 17, 338, 1232221].map((item: number) => (
        <div key={item}>{item}</div>
      ))}
      <Link to="/history">2222clqick to2 404 page12为</Link>
    </div>
  )
}
// ! 约定 服务端会调用这个方法  ===> 相当于是生命周期
// 这一块可能会设计到把redux的操作
Home.getInitialProps = ({ store }: any) => {
  console.log(store)
  // TODO
  // 在这个生命周期调用getInitialData
  store.dispatch.home.getInitialData()
  // store.dispatch.home.SET_PLAYERS([100, 200, 300,999])
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
    css,
    mapStateToProps,
    mapDispatchToProps
  },
  Home
)
