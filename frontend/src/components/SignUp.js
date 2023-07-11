import React, { useState } from "react";
import './SignUp.css';

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Implement the sign-up logic here
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      errors.mobileNumber = "Mobile number is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="Signup GIF" className="signup-gif" />
      <div className="signup-box">
        <h1>Parking System Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={handleLastNameChange} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Mobile Number:
            <input type="tel" value={mobileNumber} onChange={handleMobileNumberChange} />
            {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <button type="submit">Sign Up</button>
          <button onClick={() => props.handlePageChange("login")}>Back to Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;