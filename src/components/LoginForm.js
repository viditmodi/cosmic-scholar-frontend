import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";

function LoginForm() {

    const UserContext = useContext(UserDataContext)
    const navigate = useNavigate()

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

            if(!response.data.status){
                return
            }
            localStorage.setItem('sis_auth_token', response.data.authToken);
            localStorage.setItem('sis_user_data', JSON.stringify(response.data.data));
            UserContext.setUserData(response.data.data)
            UserContext.setAuthToken(response.data.authToken)
            // setShowLoginScreen(false)
            navigate("/dashboard")

            
        } catch (error) {
            console.log(error)
        }


    }
  return (
    <div className="popup__child">
      <p className="popup__text">
        You being here means you are a member. Quickly identify yourself and get
        to work.
      </p>
      <p className="popup__text">Who are you?</p>
      <input
        type="text"
        name="login-username"
        id="login_username"
        className="popup__textbox textbox"
        value={loginData.username}
        onChange={handleLoginDataChange}
        placeholder={"username"}
      />
      <p className="popup__text">Confirm your identity.</p>
      <input
        type="password"
        name="login-password"
        id="login_password"
        className="popup__textbox textbox"
        value={loginData.password}
        onChange={handleLoginDataChange}
        placeholder={"password"}
      />

      <button
        className="hologram__btn hologram__btn--focus"
        onClick={handleLogin}
      >
        log in
      </button>
    </div>
  );
}

export default LoginForm;
