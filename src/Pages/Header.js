import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
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
    const [currentPage, setCurrentPage] = useState('login');
    const [parking, setParking] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});


    useEffect(() => {
        async function handleAuthentication() {
            try {
                const response = await apiInstance.get('user',)
                if (response.status === 200) {
                    console.log('User Found')
                    console.log(response.data)
                    setUser(response.data)
                    setIsLoggedIn(true);
                    // setCurrentPage('dashboard');
                } else {
                    console.log('User Not Found')
                }
                // console.log("Authentication checked")
                // console.log(response.data)
                // alert(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        handleAuthentication();
        props.handleView();
    }, []);
    return (
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
                            <Link to="/profile" className="button">
                                <img className="profile-picture" src={require("./profile.png")} alt="Profile" />
                                {user.firstName + ' ' + user.lastName}
                            </Link>
                            <div className="bottom-section">
                                    <button className="logout-button" onClick={props.handleLogout}>Logout</button>
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