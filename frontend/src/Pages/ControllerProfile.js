import React from 'react';
import axios from 'axios';
import "./Profile.css";

function ControllerProfile() {
  return (
    <>
    { props.isLoggedIn ?
        (
      <div className="profile-container">
        <h2>Profile Page</h2>
        <div className='wrap'>
          <div className="profile-details">
            <p className='name'>{props.user.firstName+ ' ' + props.user.lastName}</p>
            <p>Email  : {props.user.email} </p>
            <p>Contact: {props.user.contact}</p>
            <p>Address: {props.user.address}</p>
          </div>
          <div className="payment-container">
            <p>Load Money</p>
          <div className="input-box">
              <input type="number" required value={paisa} onChange={handleAmountChange} />
              <label className={paisa ? "input-filled" : ""}>Enter amount</label>
            </div>
            {/* <label>
              Amount:
              <input type="number" value={paisa} onChange={handleAmountChange} />
            </label> */}
            <button id="payment-button" className='pay-btn' onClick={handlePayment}>Pay via Khalti</button>
          </div>
        </div>
        <h3>Booking History</h3>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reservation ID</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Charge</th>
              <th>GetQR</th>
            </tr>
          </thead>
          <tbody>
            {props.reservation.map((reserve)=> 
            <tr key={reserve.ID}>
              <td>{reserve.Date}</td>
              <td>{reserve.ID}</td>
              <td>{reserve.Location}</td>
              <td>{reserve.Duration}</td>
              <td>{reserve.Amount}</td>
              <td><button onClick={props.handleGenerateQr} className="button" value={reserve.ID}>Generate</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>)
      :
      navigate('/')
      }
    </>
  )
}

export default ControllerProfile