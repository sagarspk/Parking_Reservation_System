import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

function AddParking() {
  const [parkingName, setParkingName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [controllerEmail, setControllerEmail] = useState("");
  const [controllerPassword, setControllerPassword] = useState("");

  const handleParkingNameChange = (event) => {
    setParkingName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePricePerHourChange = (event) => {
    setPricePerHour(event.target.value);
  };

  const handleControllerEmailChange = (event) => {
    setControllerEmail(event.target.value);
  };

  const handleControllerPasswordChange = (event) => {
    setControllerPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/parking/add', {
        parkingName: parkingName,
        location: location,
        pricePerHour: pricePerHour,
        controllerEmail: controllerEmail,
        controllerPassword: controllerPassword
      });

      if (response.status === 200) {
        console.log("Parking added successfully");
        // Reset the form
        setParkingName("");
        setLocation("");
        setPricePerHour("");
        setControllerEmail("");
        setControllerPassword("");
      } else {
        console.log("Failed to add parking");
      }
    } catch (error) {
      console.error(error);
      console.log('Error occurred while adding parking');
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
      <h2 >Add Parking</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-box">
            <input type="text" required value={parkingName} onChange={handleParkingNameChange} />
            <label className={parkingName ? "input-filled" : ""}>Parking Space Name</label>
          </div>
          <div className="input-box">
            <input type="text" required value={location} onChange={handleLocationChange} />
            <label className={location ? "input-filled" : ""}>Location</label>
          </div>
          <div className="input-box">
            <input type="number" required value={pricePerHour} onChange={handlePricePerHourChange} />
            <label className={pricePerHour ? "input-filled" : ""}>Price Per Hour</label>
          </div>
          <div class="input-box">
            <input type="email" required value={controllerEmail} onChange={handleControllerEmailChange} />
            <label className={controllerEmail ? "input-filled" : ""}>Controller Email</label>
          </div>
          <div class="input-box">
            <input type="password" required value={controllerPassword} onChange={handleControllerPasswordChange} />
            <label className={controllerPassword ? "input-filled" : ""}>Controller Password</label>
          </div>
        <button className="btn" type="submit">Add Parking</button>
      </form>
      </div>
    </div>
  );
}

export default AddParking;