import React, { useState } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the login logic here
    // Assuming login is successful, call the handleLogin function
    props.handleLogin();
  };

  if (window.location.pathname !== "/controller-login") {
    return <p>You are not authorized to access this page.</p>;
  }

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