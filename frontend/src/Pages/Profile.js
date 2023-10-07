import React, { useState,useEffect } from 'react';
import axios from 'axios';
import KhaltiCheckout from 'khalti-checkout-web'
import "./Profile.css";
import { Link, useNavigate} from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
  const [ paisa, setPaisa ] = useState();
  // const [ reservation,setReservation ]  = useState({});

  const handleAmountChange=(event)=>{
    setPaisa(event.target.value);
  }


  useEffect(()=>{
    handleRequest();
  })
  const handleRequest = ()=>{
    console.log(props.isLoggedIn);
    if(props.isLoggedIn===false ){
      navigate('/');
      // alert(props.isLoggedIn);
    }
  }

  const handlePayment=(()=>{
    let config = {
      // replace this key with yours
      "publicKey": "test_public_key_6a7004582d2b411baba2a479c92b7fbb",
      "productIdentity": "1234567890",
      "productName": "Parking Spot",
      "productUrl": "http://prs.com/reserve-space",
      "eventHandler": {
          onSuccess (payload) {
              try{
                const response = axios.put('http://localhost:8000/user/load',{
                  "id":props.user.id,
                  "balance":paisa
                })
                if(response.status===200){
                  alert(payload);
                }

              }catch(error){
                console.error("balance load failed")
              }
              console.log(payload);
              window.location.reload();
          },
          // onError handler is optional
          onError (error) {
              // handle errors
              console.log(error);
              alert("TopUp Failed")

          },
          onClose () {
              console.log('widget is closing');
          }
      },
      "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    let amount = paisa*100;
    let checkout = new KhaltiCheckout(config);
    let btn = document.getElementById("payment-button");
    btn.onclick = function () {
        // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({amount});
    }
  })

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
            <th>Vehicle No.</th>
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
            <td></td>
            <td>{reserve.Location}</td>
            <td>{reserve.Duration}</td>
            <td>{reserve.Amount}</td>
            <td><button>Generate</button></td>
          </tr>)}
        </tbody>
      </table>
    </div>)
    :
    navigate('/')
    }
    </>
  );
}

export default Profile;