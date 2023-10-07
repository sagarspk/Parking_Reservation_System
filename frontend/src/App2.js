import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate,useLocation } from "react-router-dom";
import ControllerLogin from "./Pages/ControllerLogin";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import ControllerDashboard from "./Pages/ControllerDashboard";
// import OTP from './Pages/OTP';
// import ChangePassword from './Pages/ChangePassword'
import Profile from './Pages/Profile'
import axios from 'axios';
import apiInstance from "./Pages/axios";
import './App.css';
import Header from "./Pages/Header";
import AddParking from "./Pages/AddParking";

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// // import PrsMap from './components/maps'

function App2() {
  
  const navigate = useNavigate('');
  const location = useLocation();

  // const [currentPage, setCurrentPage] = useState('login');
  const [parking, setParking] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isControllerLoggedIn, setIsControllerLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [ reservation, setReservation]= useState({});
  const [ parkingSpaces, setParkingSpaces ] = useState({});
  const [ selectedLocation, setSelectedLocation] = useState('');

  // isLoggedIn?setCurrentPage('dashboard'):setCurrentPage('login');


  //Authenication Check
  const handleAuthentication=async()=> {
    try {
      const response = await apiInstance.get('user')
      if (response.status === 200) {
        console.log('User Found')
        console.log(response.data)
        setUser(response.data)
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        console.log('User Not Found')
        // navigate('/');
      }
      // console.log("Authentication checked")
      // console.log(response.data)
      // alert(response.data)
    } catch (error) {
      // console.error(error)
    }
  };

  const handleControllerAuthentication=async()=> {
    try {
      const response = await apiInstance.get('controller')
      if (response.status === 200) {
        console.log('User Found')
        console.log(response.data)
        setUser(response.data)
        setIsControllerLoggedIn(true);
        navigate('/dashboard');
      } else {
        console.log('User Not Found')
        // navigate('/');
      }
      // console.log("Authentication checked")
      // console.log(response.data)
      // alert(response.data)
    } catch (error) {
      // console.error(error)
    }
  };
  useEffect(() => {
    if(location.pathname=='/controller-login' || location.pathname=='/controller-dashboard'){
      handleControllerAuthentication();
      handleView();
    }else{
      handleView();
      handleAuthentication();
    }
    // handleParkingSpaces();
  }, []);
  // useEffect(()=>{
  //   handleReservation();
  // })
  

  // const handleUser=(userModel)=>{
  //   setUser(userModel)
  // }

  const handleView = async () => {
    try {
      const response = await axios.get('http://localhost:8000/view_parking');
      console.log(response.data);
      if (response.status === 200) {
        // console.log(response.data[0].name);
        setParking(() => response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleParkingSpaces= async(value)=>{
    // setSelectedLocation(event.target.value);
    try{
      const response = await axios.get(`http://localhost:8000/view_parking_space/${value}`);
      console.log(response.data);
      if(response.status===200){
        setParkingSpaces(()=>response.data);
      }
    }catch(error){
      console.error(error);

    }
  }

   const handleGenerateQr = async(event)=>{
    try{
      const response = await axios.post('http://localhost:8000/generate',{
        'id' : event.target.value
      });
      if(response.status===202){
        alert(response.data);
      }
    }catch(error){
      console.error("Error while generating QR");
    }

   }

  // const handleReservation=async()=>{
  //   try{
  //     console.log(user.id);
  //     const response = await axios.get(`http://localhost:8000/view_reservation/9`);
  //     console.log(response.data);
  //     if(response.status===200){
  //       setReservation(response.data);
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // };

  const handleLogout = async() => {
    try{
      const response = await axios.get('http://localhost:8000/logout')      
      // const response = await apiInstance.get('logout')
      console.log(response.data)
      if(response.status === 202){
        localStorage.setItem('access_token',null);
        localStorage.setItem('refresh_token',null);
        console.log("user logged out with null token")
        setUser({});
        setIsLoggedIn(false);
        setIsControllerLoggedIn(false);
        window.location.reload();
        // navigate("/");
      }
    }catch(error){
      alert('Logout Failed');
      console.error(error);
    }

};

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   navigate("/dashboard");
  // };

  // const handleLogout = () => {
  //   setUser({});
  //   setIsLoggedIn(false);
  //   navigate("/");
  // };

  
  return (
  <>
    <Header user={user} isLoggedIn={ isLoggedIn } handleLogout={handleLogout} />
    <Routes>
        <Route path="/add-parking" element ={<AddParking />}></Route>
        <Route path="/controller-login" element={<ControllerLogin setUser={setUser} setIsControllerLoggedIn={setIsControllerLoggedIn} />}></Route>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}/>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/dashboard" element={<Dashboard parking={parking} user={user} isLoggedIn={isLoggedIn} setReservation={setReservation} parkingSpaces={parkingSpaces} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} handleParkingSpaces={handleParkingSpaces} handleAuthentication={handleAuthentication} />}/>
        {/* <Route path="/controller-dashboard" element={<ControllerDashboard user={user} isControllerLoggedIn={isControllerLoggedIn} setReservation={setReservation} parkingSpaces={parkingSpaces} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} handleParkingSpaces={handleParkingSpaces} handleAuthentication={handleControllerAuthentication} />}/> */}
        <Route path="/profile" element={<Profile user={user} reservation={reservation} isLoggedIn={isLoggedIn} handleGenerateQr={handleGenerateQr} />}/>
        {/* <Route path="/controller-profile" element={<ControllerProfile user={user} reservation={reservation} isLoggedIn={isControllerLoggedIn} />}/> */}
    </Routes>
  </>
  );
}

export default App2;