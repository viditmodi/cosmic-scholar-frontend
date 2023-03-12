import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getImgUrl } from "./js/image";
// import UserDataContext from "../context/UserDataContext"
// import axios from "axios";
import PopUp from "./PopUp";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function HomePage(props) {

    const navigate = useNavigate()

    const [showLoginScreen, setShowLoginScreen] = useState(false)

    // * REGISTRATION --- States
    const [showRegisterScreen, setShowRegisterScreen] = useState(false)
   


    useEffect(()=>{
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
                setShowLoginScreen(false)
                setShowRegisterScreen(false)
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


      {showRegisterScreen && <PopUp child={<RegisterForm></RegisterForm>} closeUrl={"/"}></PopUp>}

      {showLoginScreen && <PopUp child={<LoginForm></LoginForm>} closeUrl={"/"}></PopUp>}
    </div>
  );
}

export default HomePage;
