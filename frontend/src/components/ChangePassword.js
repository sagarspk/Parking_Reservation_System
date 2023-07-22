import React,{useState} from 'react';
import axios from 'axios';
import './ForgotPassword.css';


function ChangePassword(props) {
    const[email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handlePasswordChange = (event) => {
      setpassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        const response = await axios.post('http://localhost:8000/change_forget_password',{
            email: email,
            password:password
        });
        if(response.status===200){
            alert(response.data);
            props.handlePageChange("login")
        }
      }catch(error){
        console.error(error);
      }
    };
  
    return (
      <div className="page-container">
        <img src={require("./login.gif")} alt="ForgotPassword GIF" className="forgotpassword-gif" />
      <div className="forgot-password-box">
        <h1>Enter your email and new Password</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
  
  
}

export default ChangePassword;