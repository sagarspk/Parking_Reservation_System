import React, { useState } from "react";
import './ForgotPassword.css';

function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the forgot password logic here
  };

  return (
    <div className="page-container">
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