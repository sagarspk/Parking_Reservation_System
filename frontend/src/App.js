import React, { useEffect,useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ControllerLogin from "./Pages/ControllerLogin";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import OTP from './Pages/OTP';
import ChangePassword from './Pages/ChangePassword'
import Profile from './Pages/Profile'
import axios from 'axios';
import apiInstance from "./Pages/axios";
import './App.css';
// import PrsMap from './components/maps'

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser] = useState({});

  // isLoggedIn?setCurrentPage('dashboard'):setCurrentPage('login');


  //Authenication Check
  useEffect(()=>{
    async function handleAuthentication(){
      try{
        const response =await apiInstance.get('user',)
        if(response.status===200){
          console.log('User Found')
          console.log(response.data)
          setUser(response.data)
          setIsLoggedIn(true);
          setCurrentPage('dashboard');
        }else{
          console.log('User Not Found')
        }
        // console.log("Authentication checked")
        // console.log(response.data)
        // alert(response.data)
      }catch(error){
        // console.error(error)
      }
    };
    handleAuthentication()
  },[]);

  // const handleUser=(userModel)=>{
  //   setUser(userModel)
  // }

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  return (
    // <div>
      // {currentPage === "login" && (
      //   <div>
      //   <Login handlePageChange={handlePageChange} handleLogin={handleLogin} user={user} setUser={setUser} />
      //   {/* <PrsMap /> */}
      //   </div>
      // )}
      // {currentPage === "signUp" && (
      //   <SignUp handlePageChange={handlePageChange}/>
      // )}
      // {currentPage === "forgotPassword" && (
      //   <ForgotPassword handlePageChange={handlePageChange} />
      // )}
      // {isLoggedIn && currentPage === "dashboard" && (
      //   <Dashboard handleLogout={handleLogout} user={user} setUser={setUser} />
      // )}
      // {currentPage === "otp" && (
      //   <OTP handlePageChange={handlePageChange} />
      // )}
      // {currentPage === "changePassword" && (
      //   <ChangePassword handlePageChange={handlePageChange} />
      // )}
    // </div>
    <div>
      { currentPage != 'profile'?
      <>
      <header>
        <div className="header-left">
          <h1>Parking Reservation System</h1>
        </div>
        <div className="header-right">
          {isLoggedIn ? 
            <>
            <div className="points-section">
              Balance: Rs{user.balance}
            </div>
            <Link to="/profile" className="button" onClick={() => handlePageChange("profile")}>
            <img className="profile-picture" src={require("./Pages/profile.png")} alt="Profile" />
            {user.firstName+ ' ' + user.lastName}
            </Link>
            </>
            :
            <>
            <Link to="/" className="button" onClick={() => handlePageChange("login")}>
              Login
            </Link>
            <Link to="/" className="button" onClick={() => handlePageChange("signUp")}>
              Register
            </Link>
            </>
          }
        </div>
      </header>
      </>
      :
      <></>
        }
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            {currentPage === "login" && (
            <Login handlePageChange={handlePageChange} handleLogin={handleLogin} user={user} setUser={setUser} />
            )}
            {currentPage === "signUp" && (
              <SignUp handlePageChange={handlePageChange}/>
            )}
            {currentPage === "forgotPassword" && (
              <ForgotPassword handlePageChange={handlePageChange} />
            )}
            {isLoggedIn && currentPage === "dashboard" && (
              <Dashboard handleLogout={handleLogout} user={user} setUser={setUser} />
            )}
            {currentPage === "otp" && (
              <OTP handlePageChange={handlePageChange} />
            )}
            {currentPage === "changePassword" && (
              <ChangePassword handlePageChange={handlePageChange} />
            )}
          </>
        }
      />
      <Route exact path="/profile" 
        element={isLoggedIn && currentPage === "profile" &&(
          <Profile user={user} setUser={setUser} />
        )}
      />
      <Route
        exact
        path="/controller-login"
        element={<ControllerLogin handleLogin={handleLogin} />}
      />
      <Route
        path="/change-password"
        element={<ChangePassword handlePageChange={handlePageChange} />}
      />
    </Routes>
  </div>
  );
}

export default App;