import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import './Login.css';

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
      <img src={require("./login.gif")} alt="Parking GIF" className="parking-gif" />
      
      {change ?
        <>
        <div className="login-box">
        <h2>Enter your new Password</h2>
        <form onSubmit={handlePasswordSubmit}>
        <div class="input-box">
            <input type="password" required value={password} onChange={handlePasswordChange} />
            <label className={password ? "input-filled" : ""}>Password</label>
          </div>
          <div class="input-box">
            <input type="password" required value={password} onChange={handlePasswordChange} />
            <label className={password ? "input-filled" : ""}>Confirm Password</label>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
        </>
      :
      <>
      { submit ? 
        <>
          <div className="login-box">
          <h2>Enter your OTP</h2>
          <form onSubmit={handleOTPSubmit}>
          <div class="input-box">
            <input type="number" required value={otp} onChange={handleOtpSubmit} />
            <label className={otp ? "input-filled" : ""}>OTP</label>
          </div> 
            <button type="submit" className="btn">Submit</button>
          </form>
          </div>
        </>
      :
        <div className="login-box">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
          <div class="input-box">
            <input type="email" required value={email} onChange={handleEmailChange} />
            <label className={email ? "input-filled" : ""}>Email</label>
          </div> 
            {/* <label>
              Email:
              <input type="email" value={email} onChange={handleEmailChange} />
            </label> */}
            <button type="submit" className="btn" >Submit</button>
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