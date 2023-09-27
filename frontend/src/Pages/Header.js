import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
// import ControllerLogin from "./Pages/ControllerLogin";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Dashboard from "./Pages/Dashboard";
// import OTP from './Pages/OTP';
// import ChangePassword from './Pages/ChangePassword'
// import Profile from './Pages/Profile'
// import axios from 'axios';
import apiInstance from "./axios";
import '../App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";



function Header(props) {

    const navigate = useNavigate('');
    const handleLogout = async() => {
        try{
        //   const response = await axios.get('http://localhost:8000/logout')      
        const response = await apiInstance.get('logout')
          console.log(response.data)
          if(response.status === 202){
            localStorage.setItem('access_token',null);
            localStorage.setItem('refresh_token',null);
            console.log("user logged out with null token")
            props.setUser({});
            props.setIsLoggedIn(false);
            navigate("/");
          }
        }catch(error){
          alert('Logout Failed');
          console.error(error);
        }
    
      };

    return (
        <>
            <header>
                <div className="header-left">
                    <h1>Parking Reservation System</h1>
                </div>
                <div className="header-right">
                    {props.isLoggedIn ?
                        <>
                            <div className="points-section">
                                Balance: Rs{props.user.balance}
                            </div>
                            <Link to="/profile" className="button">
                                <img className="profile-picture" src={require("./profile.png")} alt="Profile" />
                                {props.user.firstName + ' ' + props.user.lastName}
                            </Link>
                            <div className="bottom-section">
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </div>
                            
                        </>
                        :
                        <>
                            <Link to="/" className="button">
                                Login
                            </Link>
                            <Link to="/register" className="button">
                                Register
                            </Link>
                        </>
                    }
                </div>
            </header>
        </>
    )
}

export default Header