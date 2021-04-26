import React, { FC } from 'react'

export const Home: FC<any> = (props: any) => {
  const handleClick=()=>{
    window.alert('handleClick')
  }
  return (
   <div>
     <h1>hello react-ssr</h1>
     <button onClick={handleClick}>click me</button>
   </div>
  )
}
export default Home