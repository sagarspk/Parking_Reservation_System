import React,{useState} from 'react';
import axios from 'axios';
import './ForgotPassword.css';


function OTP(props) {
    const [otp, setOtp] = useState();

    const handleOtpChange = (event) => {
      setOtp(event.target.value);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        const response = await axios.post('http://localhost:8000/otp',{
          OTP: otp
        });
        if(response.status===202){
            alert(response.data);
            props.handlePageChange("changePassword")
        }
      }catch(error){
        console.error(error);
      }
    };
  
    return (
      <div className="page-container">
        <img src={require("./login.gif")} alt="ForgotPassword GIF" className="forgotpassword-gif" />
      <div className="forgot-password-box">
        <h1>Enter you OTP</h1>
        <form onSubmit={handleSubmit}>
          <label>
            OTP:
            <input type="number" value={otp} onChange={handleOtpChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
  
  
}

export default OTP