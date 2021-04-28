import React, { FC,useState } from 'react'
import {Link} from 'react-router-dom'
import  css from './index.less'
// @ts-ignore
// import withStyles from 'isomorphic-style-loader/withStyles'
import useStyles from 'isomorphic-style-loader/useStyles'

console.log('css',css)
export const Home: FC<any> = (props: any) => {
  const [nums,setNums] = useState<number[]>([1,2,3,4,5,6])
  useStyles(css)
  const handleClick = () => {
    window.alert('handleClick')
  }
 
  return (
    <div className="home">
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>click me1</button>
      {
        [11,2,3,4,5,6,17,8,1231].map((item:number)=><div key={item}>
          {item}
        </div>)
      }
      <Link to={'/history'}>clqick to2 404 page1</Link>
    </div>
  )
}
export default Home