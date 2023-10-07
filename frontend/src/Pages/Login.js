import React, { useState } from "react";
import { Link, useNavigate,redirect } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import ForgotPassword from "./ForgotPassword";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('');


  const handleInputChange = (event, setterFunction) => {
    const { value } = event.target;
    setterFunction(value);
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
        is_staff : "False"
        })
      if(response.status===200){
        console.log(response.status);
        const data =response.data;
        props.setUser(data);
        props.setIsLoggedIn(true);
        navigate('/dashboard');
        window.location.reload();
      }else{
        alert("Login Failed")
      }
    }catch(error){
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="Parking GIF" className="parking-gif" />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="input-box">
            <input type="email" required value={email} onChange={(event) => handleInputChange(event, setEmail)} />
            <label className={email ? "input-filled" : ""}>Email</label>
          </div>    
          <div className="input-box">
            <input type="password" value={password} onChange={(event) => handleInputChange(event, setPassword)} />
            <label className={password ? "input-filled" : ""}>Password</label>
          </div>
          <div className="remember-forgot">
          <Link to='/forgotpassword'className="a" >Forgot Password?</Link>
          </div>
            <button type="submit" className="btn" >Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;