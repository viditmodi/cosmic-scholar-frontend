import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getImgUrl } from "./js/image";
import { validateConfirmPassword, validateContact, validateEmail, validatePassword, validateUsername } from "./js/validation";
import TypedTextAnimation from "./TypedTextAnimation";
import UserDataContext from "../context/UserDataContext"
import axios from "axios";

function HomePage(props) {

    const navigate = useNavigate()
    const UserContext = useContext(UserDataContext)

    const [showLoginScreen, setShowLoginScreen] = useState(false)
    const [loginData, setLoginData]= useState({
        username: "",
        password: ""
    })
    const handleLoginDataChange = (e)=>{
        setLoginData({
            ...loginData,
            [e.target.name.split('-')[1]]: e.target.value
        })
    }
    const handleLogin = async ()=>{
        try {
            // TODO: make a request to the server
            const response = await axios.post(process.env.REACT_APP_SIS_API_URL+"/account/login", loginData)
            // const response = {
            //     status: 200,
            //     data: {
            //         status: true,
            //         message: "successfully logged in to the account",
            //         data: {
            //             username: "viditm",
            //             email: "viditmodi2001@gmail.com",
            //             contact: "9830149973",
            //             password: "qazswerdcvgtyujnmkik",
            //             level: 1,
            //             exp: 0
            //         },
            //         authToken: "qazwsxedcrfvtgbyhnujmikolp"
            //     }
            // }

            if(!response.data.status){
                return
            }
            localStorage.setItem('sis_auth_token', response.data.authToken);
            UserContext.setUserData(response.data.data)
            UserContext.setAuthToken(response.data.authToken)
            setShowLoginScreen(false)
            navigate("/dashboard")

            
        } catch (error) {
            console.log(error)
        }


    }

    // const [showStartLoginBtn, setShowStartLoginBtn] = useState(false)


    // * REGISTRATION --- States
    const [showRegisterScreen, setShowRegisterScreen] = useState(false)
    const [showRegisterBtn, setShowRegisterBtn] = useState(false)
    const [showRegisterForm, setShowRegisterForm]= useState({
        username: false,
        email: false,
        contact: false,
        password: false,
        confirm_password: false
    })
    const [registerData, setRegisterData]= useState({
        username: "",
        email: "",
        contact: "",
        password: "",
        confirm_password: ""
    })

    const handleRegisterDataChange = (e)=>{
        setRegisterData({
            ...registerData,
            [e.target.name.split('-')[1]]: e.target.value
        })

        if(e.target.name.split('-')[1] === "username"){
            handleShowRegisterFormChange('email', validateUsername(e.target.value))
        }
        if(e.target.name.split('-')[1] === "email"){
            handleShowRegisterFormChange('contact', validateEmail(e.target.value))
        }
        if(e.target.name.split('-')[1] === "contact"){
            handleShowRegisterFormChange('password', validateContact(e.target.value))
        }
        if(e.target.name.split('-')[1] === "password"){
            handleShowRegisterFormChange('confirm_password', validatePassword(e.target.value))
        }
        if(e.target.name.split('-')[1] === "confirm_password"){
            setShowRegisterBtn(validateConfirmPassword(e.target.value, registerData.password))
        }
        
    }

    const handleShowRegisterFormChange = (name, value)=>{
        setShowRegisterForm({
            ...showRegisterForm,
            [name]: value
        })
    }

    const hideRegisterForm = ()=>{
        setShowRegisterScreen(false)
        setShowRegisterForm({
            username: false,
            email: false,
            contact: false,
            password: false,
            confirm_password: false
        })
    }

    const handleRegistration = async ()=>{
        try {
            // TODO: make a request to the server

            const response = await axios.post(process.env.REACT_APP_SIS_API_URL+"/account", registerData)
            // const response = {
            //     status: 200,
            //     data: {
            //         status: true,
            //         message: "successfully created the account",
            //         data: {
            //             username: "viditm",
            //             email: "viditmodi2001@gmail.com",
            //             contact: "9830149973",
            //             password: "qazswerdcvgtyujnmkik",
            //             level: 1,
            //             exp: 0
            //         }
            //     }
            // }

            if(!response.data.status){
                return
            }
            localStorage.setItem('sis_user_data', JSON.stringify(response.data.data));
            setShowLoginScreen(true)
            setShowRegisterScreen(false)

            
        } catch (error) {
            console.log(error)
        }


    }


    useEffect(()=>{
        // setTimeout(setShowStartRegisterBtn, 3000, true);
        const authoToken = localStorage.getItem('sis_auth_token')
        if(authoToken){
            navigate('/dashboard')
        }
        switch (props.type) {
            case "login":
                console.log("login")
                setShowLoginScreen(true)
                break;
                case "register":
                console.log("register")
                setShowRegisterScreen(true)
                break;
        
            default:
                break;
        }
        // eslint-disable-next-line
    },[props.type])
  return (
    <div className="home">
      <div
        className="home__planet home__planet--main planet planet--venus"
        style={{ backgroundImage: `url(${getImgUrl("venus.png")})` }}
      >
        <NavLink to="/login" className="planet__moon planet__moon--2">Login</NavLink>
        <NavLink to="/register" className="planet__moon planet__moon--4">Sign Up</NavLink>
      </div>

      <div
        className="home__planet home__planet--top-left planet planet--mars"
        style={{ backgroundImage: `url(${getImgUrl("mars.png")})` }}
      >
        <div className="planet__moon planet__moon--1"></div>
        <div className="planet__moon planet__moon--3"></div>
      </div>

      {/* <div className="asteroid" style={{'backgroundImage': `url(${getImgUrl('asteroid.png')})`}}></div> */}








      {showRegisterScreen && <div className="home__screen hologram__screen">
        <button className="hologram__btn-hide" onClick={hideRegisterForm}>X</button>

        <p className="hologram__text">
        Humans have managed to make settlements in space but they come with more challenges. These Settlements need special personnel to handle the challenges. Are you up for the challenges?
        </p>

        {!showRegisterForm.username && <button className="hologram__btn hologram__btn--focus" onClick={()=>{handleShowRegisterFormChange("username", true)}}>Yes</button>}

        {showRegisterForm.username && <TypedTextAnimation text={"I see, you want to help in the advancement of Humanity. What shall I call you?"} id={'register-text-1'} class={'hologram__text'}></TypedTextAnimation>}

        {showRegisterForm.username && <input type="text" name="register-username" id="register_username" className="hologram__textbox textbox" value={registerData.username} onChange={handleRegisterDataChange} placeholder={"username"}/>}

        

       {showRegisterForm.email && <TypedTextAnimation text={"Give your online address where you can receive our mails"} id={'register-text-2'} class={'hologram__text'}></TypedTextAnimation>}

        {showRegisterForm.email && <input type="text" name="register-email" id="register_email" className="hologram__textbox textbox" value={registerData.email} onChange={handleRegisterDataChange} placeholder={"email"}/>}

        

        {showRegisterForm.contact && <TypedTextAnimation text={"Give your contact number"} id={'register-text-3'} class={'hologram__text'}></TypedTextAnimation>}

        {showRegisterForm.contact && <input type="text" name="register-contact" id="register_contact" className="hologram__textbox textbox" value={registerData.contact} onChange={handleRegisterDataChange} placeholder={"contact"}/>}

        

        {showRegisterForm.password && <TypedTextAnimation text={"give a secret key to identify yourself"} id={'register-text-4'} class={'hologram__text'}></TypedTextAnimation>}

        {showRegisterForm.password && <input type="password" name="register-password" id="register_password" className="hologram__textbox textbox" value={registerData.password} onChange={handleRegisterDataChange} placeholder={"password"}/>}

        

        {showRegisterForm.confirm_password && <TypedTextAnimation text={"confirm your secret key"} id={'register-text-5'} class={'hologram__text'}></TypedTextAnimation>}

        {showRegisterForm.confirm_password && <input type="password" name="register-confirm_password" id="register_confirm_password" className="hologram__textbox textbox" value={registerData.confirm_password} onChange={handleRegisterDataChange} placeholder={"confirm password"}/>}

        {showRegisterBtn && <button className="hologram__btn hologram__btn--focus" onClick={handleRegistration}>register</button>}

        </div>
        }







      {showLoginScreen && <div className="home__screen hologram__screen">
        <button className="hologram__btn-hide" onClick={()=>{setShowLoginScreen(false)}}>X</button>
        login
        <p className="hologram__text">
        You being here means you are a member. Quickly identify yourself and get to work.
        </p>
        <p className="hologram__text">
       Who are you?
        </p>
        <input type="text" name="login-username" id="login_username" className="hologram__textbox textbox" value={loginData.username} onChange={handleLoginDataChange} placeholder={"username"}/>
        <p className="hologram__text">
       Confirm your identity.
        </p>
        <input type="password" name="login-password" id="login_password" className="hologram__textbox textbox" value={loginData.password} onChange={handleLoginDataChange} placeholder={"password"}/>

        <button className="hologram__btn hologram__btn--focus" onClick={handleLogin}>log in</button>

        </div>}
    </div>
  );
}

export default HomePage;
