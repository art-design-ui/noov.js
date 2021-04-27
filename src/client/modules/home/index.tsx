import React, { FC,useState } from 'react'
import {Link} from 'react-router-dom'
export const Home: FC<any> = (props: any) => {
  const [nums,setNums] = useState<number[]>([1,2,3,4,5,6])
  const handleClick = () => {
    window.alert('handleClick')
  }
 
  return (
    <div>
      <h1>hello react-ssr</h1>
      <button onClick={handleClick}>click me</button>
      {
        [1,2,3,4,5,6,7,8,9,10].map((item:number)=><div key={item}>
          {item}
        </div>)
      }
      <Link to={'/history'}>click to 404 page</Link>
    </div>
  )
}
export default Home