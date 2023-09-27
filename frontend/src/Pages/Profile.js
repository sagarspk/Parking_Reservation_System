import React, { useState } from 'react';
import KhaltiCheckout from 'khalti-checkout-web'
import "./Profile.css";
import { Link, useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
  const [ amount, setAmount ] = useState();

  const handleAmountChange=(event)=>{
    setAmount(event.target.value);
  }

  const handlePayment=(()=>{
    let config = {
      // replace this key with yours
      "publicKey": "test_public_key_6a7004582d2b411baba2a479c92b7fbb",
      "productIdentity": "1234567890",
      "productName": "Drogon",
      "productUrl": "http://gameofthrones.com/buy/Dragons",
      "eventHandler": {
          onSuccess (payload) {
              // hit merchant api for initiating verfication
              console.log(payload);
          },
          // onError handler is optional
          onError (error) {
              // handle errors
              console.log(error);
          },
          onClose () {
              console.log('widget is closing');
          }
      },
      "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    let checkout = new KhaltiCheckout(config);
    let btn = document.getElementById("payment-button");
    btn.onclick = function () {
        // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({amount});
    }
  })

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      {/* <div>
        <Link to="/dashboard" className="button" onClick={() => navigate('/dashboard')}>
          Back
        </Link>
      </div> */}
      <div className="profile-details">
        <h2>{props.user.firstName+ ' ' + props.user.lastName}</h2>
        <p>Email  : {props.user.email} </p>
        <p>Contact: {props.user.contact}</p>
        <p>Address: {props.user.address}</p>
      </div>
      <div className="payment-container">
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <button id="payment-button" onClick={handlePayment}>Pay via Khalti</button>
      </div>
      <h2>Booking History</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reservation ID</th>
            <th>Vehicle No.</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Charge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-09-25</td>
            <td>12345</td>
            <td></td>
            <td>Booking details...</td>
            <td></td>
            <td></td>
          </tr>
          {/* Add more rows for additional booking history */}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;