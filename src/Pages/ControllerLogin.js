import React, { useState } from "react";
import axios from 'axios';
import './ControllerLogin.css';

function ControllerLogin(props) {
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
        const response = await axios.post('http://localhost:8000/controller/login', {
          email:email,
          password:password,
          // is_staff: true
          })
        // alert(response.data.user.email)
        if(response.status===200){
          console.log(response.status)
          const data =response.data
          props.setUser(data)
          // console.log(props.user)
          props.handleLogin();
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
        <h1>Controller Login</h1>
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
        </form>
      </div>
    </div>
  );
}

export default ControllerLogin;