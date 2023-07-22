import React, { useState } from "react";
import axios from 'axios';
import OTP from './OTP'
import './ForgotPassword.css';

function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/forget_password',{
        email:email
      });
      <OTP />
      if(response.status===200){
        console.log(response.data);
        props.handlePageChange("otp")
      }else{
        console.error(response.data)
      }
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="ForgotPassword GIF" className="forgotpassword-gif" />
    <div className="forgot-password-box">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Submit</button>
        <button onClick={() => props.handlePageChange("login")}>Back to Login</button>
      </form>
    </div>
  </div>
);
}

export default ForgotPassword;