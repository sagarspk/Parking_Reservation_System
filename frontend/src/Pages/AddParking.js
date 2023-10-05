import React, { useState } from "react";
import axios from 'axios';
import './AddParking.css';

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
      const response = await axios.post('http://localhost:8000/controller/register', {
        name: parkingName,
        location: location,
        price_per_hour: pricePerHour,
        email: controllerEmail,
        password: controllerPassword,
        open: 'True'
      });

      if (response.status === 201) {
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
    <div className="add-parking-container">
      <h1 className="add-parking-title">Add Parking</h1>
      <form className="add-parking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="parkingName">Parking Space Name:</label>
          <input
            type="text"
            id="parkingName"
            value={parkingName}
            onChange={handleParkingNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pricePerHour">Price per Hour:</label>
          <input
            type="number"
            id="pricePerHour"
            value={pricePerHour}
            onChange={handlePricePerHourChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="controllerEmail">Controller Email:</label>
          <input
            type="email"
            id="controllerEmail"
            value={controllerEmail}
            onChange={handleControllerEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="controllerPassword">Controller Password:</label>
          <input
            type="password"
            id="controllerPassword"
            value={controllerPassword}
            onChange={handleControllerPasswordChange}
          />
        </div>
        <button className="add-parking-button" type="submit">Add Parking</button>
      </form>
    </div>
  );
}

export default AddParking;