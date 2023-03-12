import React from 'react'
import { useNavigate } from 'react-router-dom'

function PopUp(props) {
    const navigate = useNavigate()

    const closePopUp = ()=>{
        navigate(props.closeUrl)
    }
  return (
    <div className='popup'>
        <div className="popup__screen">
      {props.child}
      </div>
      <button className="popup__close-btn" onClick={closePopUp}>X</button>
    </div>
  )
}

export default PopUp
