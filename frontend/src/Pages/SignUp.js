import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (event, setterFunction) => {
    const { value } = event.target;
    setterFunction(value);
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
        });
        console.log(response.data);
        alert("User Created Successfully");
      }catch(error){
        alert('Registration Failed');
        console.error(error);
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
      errors.password = "Password should be at least 8 characters long";
    }
    return errors;
  };

  return (
    <div className="page-container">
      <img src={require("./login.gif")} alt="Parking GIF" className="parking-gif" />
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" value={firstName} onChange={(event) => handleInputChange(event, setFirstName)} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
            <label className={firstName ? "input-filled" : ""}>First Name</label>
          </div>
          <div className="input-box">
            <input type="text" value={lastName} onChange={(event) => handleInputChange(event, setLastName)} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
            <label className={lastName ? "input-filled" : ""}>Last Name</label>
          </div>
          <div className="input-box">
            <input type="email" value={email} onChange={(event) => handleInputChange(event, setEmail)} />
            {errors.email && <span className="error">{errors.email}</span>}
            <label className={email ? "input-filled" : ""}>Email</label>
          </div>
          <div className="input-box">
            <input type="text" value={contact} onChange={(event) => handleInputChange(event, setContact)} />
            {errors.contact && <span className="error">{errors.contact}</span>}
            <label className={contact ? "input-filled" : ""}>Contact</label>
          </div>
          <div className="input-box">
            <input type="password" value={password} onChange={(event) => handleInputChange(event, setPassword)} />
            {errors.password && <span className="error">{errors.password}</span>}
            <label className={password ? "input-filled" : ""}>Password</label>
          </div>
          <div className="input-box">
            <input type="text" value={address} onChange={(event) => handleInputChange(event, setAddress)} />
            {errors.address && <span className="error">{errors.address}</span>}
            <label className={address ? "input-filled" : ""}>Address</label>
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;