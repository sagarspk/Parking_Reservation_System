import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import OTP from './OTP'
import './ForgotPassword.css';

function ForgotPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ submit, setSubmit] = useState(false);
  const [ change, setChange] = useState(false);
  const [otp, setOtp] = useState();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/forget_password',{
        email:email
      });
      if(response.status===200){
        console.log(response.data);
        setSubmit(true);
      }else{
        console.error(response.data)
      }
    }catch(error){
      console.error(error);
    }
  };


    const handleOtpSubmit= (event) => {
      setOtp(event.target.value);
    };
  
  const handleOTPSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/otp',{
        OTP: otp
      });
      if(response.status===202){
          alert(response.data);
          setChange(true);
      }
    }catch(error){
      console.error(error);
    }
  };

  const handlePasswordSubmit = async(event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    try{
      const response = await axios.post('http://localhost:8000/change_forget_password',{
          email: email,
          password: password
      });
      if(response.status===200){
          alert(response.data);
          navigate('/');
      }
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="ForgotPassword GIF" className="forgotpassword-gif" />
      
      {change ?
        <>
        <div className="forgot-password-box">
        <h1>Enter your new Password</h1>
        <form onSubmit={handlePasswordSubmit}>
            <label>
            Password:
            <input type="email" value={password} onChange={handlePasswordChange} />
            </label>
            <label>
            Confirm Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
          <button type="submit">Submit</button>
        </form>
      </div>
        </>
      :
      <>
      { submit ? 
        <>
          <div className="forgot-password-box">
          <h1>Enter you OTP</h1>
          <form onSubmit={handleOTPSubmit}>
            <label>
              OTP:
              <input type="number" value={otp} onChange={handleOtpSubmit} />
            </label>
            <button type="submit">Submit</button>
          </form>
          </div>
        </>
      :
        <div className="forgot-password-box">
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <button type="submit"     >Submit</button>
            {/* <button onClick={() => }>Back to Login</button> */}
          </form>
        </div>
      }
    </>
    }
    </div>
);
}

export default ForgotPassword;