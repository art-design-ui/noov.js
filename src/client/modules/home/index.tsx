import React, { FC,useState } from 'react'
import {Link} from 'react-router-dom'
import  css from './index.less'
// @ts-ignore
import withStyles from 'isomorphic-style-loader/withStyles'

console.log('css',css)
export const Home: FC<any> = (props: any) => {
  const [nums,setNums] = useState<number[]>([1,2,3,4,5,6])
  const handleClick = () => {
    window.alert('handleClick')
  }
  return (
    <div className="home">
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>click me1的顶顶顶顶顶的</button>
      {
        [111,2,3,4,5,6111,17,338,1232221].map((item:number)=><div key={item}>
          {item}
        </div>)
      }
      <Link to={'/history'}>2222clqick to2 404 page12为</Link>
    </div>
  )
}
export default withStyles(css)(Home)