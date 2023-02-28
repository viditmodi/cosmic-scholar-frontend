import React, { useEffect } from 'react'
import { typeText } from './js/typingAnimation';

function TypedTextAnimation(props) {
    // const [content, setContent] = useState("")
    useEffect(()=>{
        const text = props.text;

        typeText(text, 0, document.getElementById(props.id))

    },[props.id, props.text])
  return (
    <p id={props.id} className={props.class}></p>
  )
}

export default TypedTextAnimation
