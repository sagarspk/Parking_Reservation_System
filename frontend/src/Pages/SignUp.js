import React, { useState } from "react";
import axios from 'axios';
import './SignUp.css';

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
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

  const handleContact = (event) => {
    setContact(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try{
        const response = await axios.post('http://localhost:8000/user/register', {
          email:email,
          password:password,
          first_name :firstName,
          last_name : lastName,
          contact : contact,
          address:address
      })      
      console.log(response.data)
      alert("User Created Successfully")
      }catch(error){
        alert('Registration Failed')
        console.error(error)
      }
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
    if (!contact.trim()) {
      errors.contact = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(contact)) {
      errors.contact = "Mobile number is invalid";
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
            Contact:
            <input type="tel" value={contact} onChange={handleContact} />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <label>
            Address:
            <input type="text" value={address} onChange={handleAddressChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>
          <button type="submit">Sign Up</button>
          <button onClick={() => props.handlePageChange("login")}>Back to Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;