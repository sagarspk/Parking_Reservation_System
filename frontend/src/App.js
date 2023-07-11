import React, { useEffect,useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import axios from 'axios';
// import PrsMap from './components/maps'

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser] = useState('');

//   const response = () =>{
//   try{
//     const instance = axios.create({baseURL:'http://localhost:8000'})
//     console.log("Instance created")
//     return instance
//   }catch(error){
//     console.error(error)
//   }
// }

  //Authenication Check
  useEffect(()=>{
    async function handleAuthentication(){
      try{
        const response =await axios.post('http://localhost:8000/isAuthenticated',{
          user_id : 'sagarsapkota@gmail.com'
        })
        console.log("Authentication checked")
        console.log(response.data)
        alert(response.data)
      }catch(error){
        console.error(error)
      }
    };
    handleAuthentication()
  },[]);

  const handleUser=(userModel)=>{
    setUser(userModel)
  }

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
    <div>
      {currentPage === "login" && (
        <div>
        <Login handlePageChange={handlePageChange} handleLogin={handleLogin} handleUser={handleUser} />
        {/* <PrsMap /> */}
        </div>
      )}
      {currentPage === "signUp" && (
        <SignUp handlePageChange={handlePageChange} />
      )}
      {currentPage === "forgotPassword" && (
        <ForgotPassword handlePageChange={handlePageChange} />
      )}
      {isLoggedIn && currentPage === "dashboard" && (
        <Dashboard handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;