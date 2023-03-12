import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";
import { isUserLoggedIn } from "./js/checkLoginStatus";
// import { getImgUrl } from "./js/image";

function Dashboard() {
  const UserContext = useContext(UserDataContext);
  const navigate = useNavigate();
  // const [expWidth, setExpWidth] = useState();
  
  // const [showLevelSelector, setShowLevelSelector] = useState(false);
  useEffect(() => {
    console.log(UserContext.userData);
    if (!isUserLoggedIn()) {
      navigate("/");
    }
    // setExpWidth(
    //   (UserContext.userData.exp * 100) / UserContext.userData.required_exp
    // );
  }, [UserContext.userData, navigate]);
  return (
    <div className="dashboard">
      <div className="profile">
        <div className="profile__side profile__left">
          <div className="profile__icon profile__icon--level ui__bg ui__bg--blue">
            {UserContext.userData.level}
          </div>
          <div className="profile__text profile__text--level">
            {UserContext.userData.exp}/{UserContext.userData.required_exp}
          </div>
        </div>
        <div className="profile__side profile__right">
          <div className="profile__text profile__text--gold">
            {UserContext.userData.gold}
          </div>
          <div className="profile__icon profile__icon--gold ui__bg ui__bg--yellow">
            {/* {UserContext.userData.level} */}
          </div>
        </div>
      </div>
      {/* {JSON.stringify(UserContext.userData)} */}

      {/* {!showLevelSelector && <div className="profile dashboard__profile dashboard__profile--left">
        <div className="profile__stats">
            <p className="profile__stats__level">{UserContext.userData.level}</p>
            <div className="profile__stats__details">
              <p className="profile__stats__username">{UserContext.userData.username}</p>
              <div className="profile__stats__exp-bar">
                <div className="profile__stats__exp-bar__content" style={{'width': `${expWidth}%`}}>{UserContext.userData.exp}</div>
              </div>
            </div>
        </div>
      </div>} */}
      {/* {!showLevelSelector && (
        <div className="profile dashboard__profile dashboard__profile--left">
          <div className="profile__stats">
            <p className="profile__stats__username">
              {UserContext.userData.username}
            </p>
            <p className="profile__stats__leve ui__bg">
              {UserContext.userData.level}
            </p>
            <div className="profile__stats__exp-bar">
              <div
                className="profile__stats__exp-bar__content"
                style={{ height: `${expWidth}%` }}
              >
                {/* {UserContext.userData.exp} /}
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* <div className="profile dashboard__profile dashboard__profile--right">
        {/* <p className="profile__level profile__text">Level: {}</p> */}
      {/* <p className="profile__username profile__text">Username: {}</p> *
        <p className="profile__gold profile__text">
          Gold: {UserContext.userData.gold}
        </p>
      </div> */}

      <div className="dashboard__main">
        <div className="dashboard__logo logo">
          <span className="logo__part logo__1">Cosmic</span>
          <span className="logo__part logo__2">Scholar</span>
        </div>
        <NavLink
          to={"/quiz/selection"}
          className="btn btn--space btn--3d dashboard__btn--start"
        >
          start
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
