import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateConfirmPassword, validateContact, validateEmail, validatePassword, validateUsername } from './js/validation'
import TypedTextAnimation from './TypedTextAnimation'

function RegisterForm() {

    const navigate = useNavigate()
    const [showUsername, setShowUsername] = useState(false)
    const [showEmail, setShowEmail] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showRegisterBtn, setShowRegisterBtn] = useState(false)



    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        contact: "",
        password: "",
        confrim_password: ""
    })

    const handleRegisterDataChange = (e)=>{
        setRegisterData({
            ...registerData,
            [e.target.name.split("-")[1]]: e.target.value
        })

        if(e.target.name.split('-')[1] === "username"){
            setShowEmail(validateUsername(e.target.value))
        }
        if(e.target.name.split('-')[1] === "email"){
            setShowContact(validateEmail(e.target.value))
        }
        if(e.target.name.split('-')[1] === "contact"){
            setShowPassword(validateContact(e.target.value))
        }
        if(e.target.name.split('-')[1] === "password"){
            setShowConfirmPassword(validatePassword(e.target.value))
        }
        if(e.target.name.split('-')[1] === "confirm_password"){
            setShowRegisterBtn(validateConfirmPassword(e.target.value, registerData.password))
        }

        // let registerForm = document.getElementById('register-form')
        // registerForm.scroll({ top: registerForm.scrollHeight, behavior: "smooth"});
        
    }



    const handleRegistration = async ()=>{
        try {
            console.log("register")
            // TODO: make a request to the server

            const response = await axios.post(process.env.REACT_APP_SIS_API_URL+"/account", registerData)

            if(!response.data.status){
                return
            }
            localStorage.setItem('sis_user_data', JSON.stringify(response.data.data));
            navigate("/login")

            
        } catch (error) {
            console.log(error)
        }


    }
  return (
    <div className='popup__child' id='register-form'>
      <p className="popup__text">
        Humans have managed to make settlements in space but they come with more challenges. These Settlements need special personnel to handle the challenges. Are you up for the challenges?
        </p>

        {!showUsername && <button className="hologram__btn hologram__btn--focus" onClick={()=>{setShowUsername(true)}}>Yes</button>}

        {showUsername && <TypedTextAnimation text={"I see, you want to help in the advancement of Humanity. What shall I call you?"} id={'register-text-1'} class={'popup__text'}></TypedTextAnimation>}

        {showUsername && <input type="text" name="register-username" id="register_username" className="popup__textbox textbox" value={registerData.username} onChange={handleRegisterDataChange} placeholder={"username"}/>}


        {showEmail && <TypedTextAnimation text={"Give your online address where you can receive our mails"} id={'register-text-2'} class={'popup__text'}></TypedTextAnimation>}

        {showEmail && <input type="email" name="register-email" id="register_email" className="popup__textbox textbox" value={registerData.email} onChange={handleRegisterDataChange} placeholder={"email"} required/>}


        {showContact && <TypedTextAnimation text={"Give your contact number"} id={'register-text-3'} class={'popup__text'}></TypedTextAnimation>}

        {showContact && <input type="text" name="register-contact" id="register_contact" className="popup__textbox textbox" value={registerData.contact} onChange={handleRegisterDataChange} placeholder={"contact"} required/>}


        {showPassword && <TypedTextAnimation text={"give a secret key to identify yourself"} id={'register-text-4'} class={'popup__text'}></TypedTextAnimation>}

        {showPassword && <input type="password" name="register-password" id="register_password" className="popup__textbox textbox" value={registerData.password} onChange={handleRegisterDataChange} placeholder={"password"} required/>}


        {showConfirmPassword && <TypedTextAnimation text={"confirm your secret key"} id={'register-text-5'} class={'popup__text'}></TypedTextAnimation>}

        {showConfirmPassword && <input type="password" name="register-confirm_password" id="register_confirm_password" className="popup__textbox textbox" value={registerData.confirm_password} onChange={handleRegisterDataChange} placeholder={"confirm password"} required/>}



        {showRegisterBtn && <button className="hologram__btn hologram__btn--focus" onClick={handleRegistration}>register</button>}
    </div>
  )
}

export default RegisterForm
