import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import style from './index.less'
import isConnect from '@/library/isConnect'

export const About: FC<any> = () => {
  const handleClick = () => {
    window.alert('handleClick')
  }
  return (
    <div className="abut">
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>关于我页面</button>
      {[111, 2, 3, 4, 5, 6111, 17, 338, 1232221].map((item: number) => (
        <div key={item}>{item}</div>
      ))}
      <Link to="/history">click</Link>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  home: state.home
})

const mapDispatchToProps = () => ({})

export default isConnect(
  {
    css: {},
    mapStateToProps,
    mapDispatchToProps
  },
  About
)
