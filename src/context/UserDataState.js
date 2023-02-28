import { useState } from "react"
import UserDataContext from "./UserDataContext"


const UserDataState = (props)=>{

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        contact: "",
        level: 1,
        exp: 0
    })

    const [authToken, setAuthToken] = useState("")


    const exportObject = {userData, setUserData, authToken, setAuthToken}
    return(
        <UserDataContext.Provider value={exportObject}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export default UserDataState