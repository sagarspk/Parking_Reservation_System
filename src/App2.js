import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
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
import Header from "./Pages/Header";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import PrsMap from './components/maps'

function App2() {
    const navigate = useNavigate('')

  const [currentPage, setCurrentPage] = useState('login');
  const [parking, setParking] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // isLoggedIn?setCurrentPage('dashboard'):setCurrentPage('login');


  //Authenication Check

  useEffect(() => {
    async function handleAuthentication() {
      try {
        const response = await apiInstance.get('user',)
        if (response.status === 200) {
          console.log('User Found')
          console.log(response.data)
          setUser(response.data)
          setIsLoggedIn(true);
          navigate('/dashboard');
        } else {
          console.log('User Not Found')
        }
        // console.log("Authentication checked")
        // console.log(response.data)
        // alert(response.data)
      } catch (error) {
        // console.error(error)
      }
    };
    handleAuthentication();
    handleView();
  }, []);


  // const handleUser=(userModel)=>{
  //   setUser(userModel)
  // }

  const handleView = async () => {
    try {
      const response = await axios.get('http://localhost:8000/view_parking');
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data[0].name);
        setParking(() => response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

//   const handlePageChange = (pageName) => {
//     setCurrentPage(pageName);
//   };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  
  return (
  <>
    <Header handleLogout={handleLogout} handleView={handleView}/>
    <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        {/* <Route path="/dashboard" element={<Dashboard />}/> */}
        <Route path="/profile" element={<Profile />}/>
    </Routes>
  </>
  );
}

export default App2;