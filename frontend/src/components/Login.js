import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://192.168.3.8:8000/user/login', {
        email:email,
        password:password
        })
    console.log(response.data.user)
    props.handleUser(response.data.user);
    props.handleLogin();
    }catch(error){
      alert('Login Failed')
      console.error(error)
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
          <button type="submit">Login</button>
          <button onClick={() => props.handlePageChange("forgotPassword")}>
            Forgot password?
          </button>
          <button onClick={() => props.handlePageChange("signUp")}>Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;