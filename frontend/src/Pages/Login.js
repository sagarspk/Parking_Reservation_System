import React, { useState } from "react";
import { Link, useNavigate,redirect } from 'react-router-dom';
import axios from 'axios';
// import apiInstance from "./axios";
import './Login.css';
import ForgotPassword from "./ForgotPassword";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('');
  // const [isStaff, setIsStaff] = useState(false);
  // const [ user, setUser] =useState({});


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleForgetPassword = () =>{
    navigate('/forgetpassword')
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:8000/token/',{
        email:email,
        password:password
      });
      if(response.status===200){
        const access_token = response.data.access;
        const refreshToken = response.data.refresh;
        localStorage.setItem('access_token',access_token);
        localStorage.setItem('refresh_token',refreshToken);
      }else{
        console.log(response.data.details);
      }
    }catch(error){
      console.error(error);
      console.log('Error at token');
    }
    


    try{
      const response = await axios.post('http://localhost:8000/user/login', {
        email:email,
        password:password,
        // is_staff: false
        })
      // alert(response.data.user.email)
      if(response.status===200){
        console.log(response.status)
        const data =response.data
        props.setUser(data)
        props.handleLogin();
        navigate('/dashboard');
        // console.log(props.user)
      }else{
        alert("Login Failed")
      }
      // console.log(response.data)
    }catch(error){
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="Parking GIF" className="parking-gif" />
      <div className="login-box">
        <h1> Parking Reservation System</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          {/* <label>
            Customer:
            <input type="radio" value='User' onClick={()=>{setIsStaff(false)}} />
          </label>
          <label>
            Controller:
            <input type="radio" value='Controller' onClick={()=>{setIsStaff(true)}} />
          </label> */}
          <div >
            <button type="submit" >Login</button>
          </div>
        </form>
          {/* <button onClick={() => handleForgetPassword}>
            Forgot password?
          </button> */}
          <Link to='/forgotpassword'className="link" >Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;