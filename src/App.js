import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/css/main.css';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import QuizScreen from './components/QuizScreen';
import UserDataContext from './context/UserDataContext';

function App() {

  const UserData = useContext(UserDataContext)

  useEffect(()=>{
    const savedAuthToken = localStorage.getItem("sis_auth_token")
    const savedUserData = localStorage.getItem("sis_user_data")

    if(savedAuthToken && savedUserData){
      UserData.setUserData(savedUserData)
      UserData.setAuthToken(savedAuthToken)
    }
  },[])
  
  return (
    <div className="App">

      <BrowserRouter>

      <Routes>

<Route path='/' element={<HomePage></HomePage>}></Route>
<Route path='/login' element={<HomePage type={'login'}></HomePage>}></Route>
<Route path='/register' element={<HomePage type={'register'}></HomePage>}></Route>
<Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
<Route path='/quiz' element={<QuizScreen></QuizScreen>}></Route>

      </Routes>
      </BrowserRouter>
      {/* <div className="planet planet--mars" style={{'backgroundImage': `url(${getImgUrl('mars.png')})`}}></div> */}
      
    </div>
  );
}

export default App;
