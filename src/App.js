import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/css/main.css";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PopUp from "./components/PopUp";
import QuizScreen from "./components/QuizScreen";
import QuizSelector from "./components/QuizSelector";
// import RegisterForm from "./components/RegisterForm";
import Timer from "./components/Timer";
import UserDataContext from "./context/UserDataContext";

function App() {
  const UserData = useContext(UserDataContext);

  useEffect(() => {
    const savedAuthToken = localStorage.getItem("sis_auth_token");
    const savedUserData = JSON.parse(localStorage.getItem("sis_user_data"));

    if (savedAuthToken && savedUserData) {
      UserData.setUserData(savedUserData);
      UserData.setAuthToken(savedAuthToken);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/test"
            element={<PopUp child={<Timer time={5}></Timer>}></PopUp>}
          ></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/login"
            element={<HomePage type={"login"}></HomePage>}
          ></Route>
          <Route
            path="/register"
            element={<HomePage type={"register"}></HomePage>}
          ></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/quiz/selection"
            element={<PopUp child={<QuizSelector></QuizSelector>} closeUrl={'/dashboard'}></PopUp>}
          ></Route>
          <Route
            path="/quiz/:category/:difficulty"
            element={<PopUp child={<QuizScreen questionTime={10}></QuizScreen>} closeUrl={'/dashboard'}></PopUp>}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="planet planet--mars" style={{'backgroundImage': `url(${getImgUrl('mars.png')})`}}></div> */}
    </div>
  );
}

export default App;
