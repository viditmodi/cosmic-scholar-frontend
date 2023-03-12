import React, { useEffect, useState } from 'react'
import { sleep } from './js/sleep'

function Timer(props) {
    const [time, setTime] = useState()
    
    useEffect(()=>{
        const changeTime = async (time)=>{
            setTime(time)
            if(time===0){
                return
            }
            await sleep(1000)
            changeTime(time-1)
        }

        
        changeTime(props.time)
    },[props.time])

   
  return (
    <div className='timer'>
      {time}
    </div>
  )
}

export default Timer
