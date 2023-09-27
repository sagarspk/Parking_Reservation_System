import React, { useEffect,useState } from "react";
import ViewParking from "./ViewParking";
import KhaltiCheckout from 'khalti-checkout-web'
import axios from 'axios';
import "./Dashboard.css";

function Dashboard(props) {
  const [parkingSpaces, setParkingSpaces] = useState([
    [true, true, true, true, true],
    [true, true, true, true, true]
  ]);
  // const [ parking, setParking] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [balance, setBalance] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async() => {
    try{
      const response = await axios.get('http://localhost:8000/logout')      
      console.log(response.data)
      localStorage.setItem('access_token',null);
      localStorage.setItem('refresh_token',null);
      props.setUser({});
      props.handleLogout();
    }catch(error){
      alert('Logout Failed');
      console.error(error);
    }

  };

  const handlePayment=(()=>{
    let config = {
      // replace this key with yours
      "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
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
    const amount = 200;
    let checkout = new KhaltiCheckout(config);
    let btn = document.getElementById("payment-button");
    btn.onclick = function () {
        // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({amount});
    }
  })
  const handleBalance=()=>{
    setBalance(props.user.balance);
    // try {
    //   const response = axios.get('http://192.168.3.8:8000/user')
    //   console.log(response.data.user)
    //   setBalance(response.data.user.balance)
    // } catch (error) {
    //   console.error(error);
    // }
  };
  useEffect(()=>{
    handleBalance();
  },[])
  // useEffect(()=>{
  //   handleView();
  // },[])

  const handleSelectSpace = (rowIndex, spaceIndex) => {
    if (selectedSpace && selectedSpace.rowIndex === rowIndex && selectedSpace.spaceIndex === spaceIndex) {
      setSelectedSpace(null);
    } else {
      setSelectedSpace({ rowIndex, spaceIndex });
    }
  };

  // const handleView= async()=>{
  //   try{
  //     const response = await axios.get('http://localhost:8000/view_parking');
  //     if(response.status===200){
  //       console.log(response.data[0].name);
  //       setParking(()=>response.data);
  //       console.log(parking[0].name);
  //     }
  //   }catch(error){
  //     console.error(error);
  //   }
  // }

  const handleReserveSpace = () => {
    const updatedSpaces = [...parkingSpaces];
    updatedSpaces[selectedSpace.rowIndex][selectedSpace.spaceIndex] = false;
    setParkingSpaces(updatedSpaces);
    setBalance(balance - 10);
    setSelectedSpace(null);
  };

  const handleFreeSpace = (rowIndex, spaceIndex) => {
    const updatedSpaces = [...parkingSpaces];
    updatedSpaces[rowIndex][spaceIndex] = true;
    setParkingSpaces(updatedSpaces);
  };

  const handleSelectLocation = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleChangeLocation = () => {
    setSelectedLocation(null);
    setSelectedSpace(null);
  };

  // const handleProfileDropdownClick = () => {
  //   setIsProfileDropdownOpen(!isProfileDropdownOpen);
  // };

  return (
    <div className="container">
      {/* <h1 className="title">Parking Reservation System</h1>
      <div className="top-section">
        <div className="profile-section">
          <img className="profile-picture" src={require("./profile.png")} alt="Profile" />
          <span className="profile-name" onClick={handleProfileDropdownClick}>{props.user.firstName+' '+props.user.lastName}</span>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>Edit Profile</li>
                <li>View History</li>
                <li>Change Password</li>
              </ul>
            </div>
          )}
        </div>
        <div className="points-section">
          Balance: Rs:{balance}
        </div>
      </div> */}
      <div className="payment-container">
        <button id="payment-button" onClick={handlePayment}>Pay via Khalti</button>
      </div>
      <div className="parking-box">
        {selectedLocation ? (
          <div>
            <div className="parking-grid">
              <div className="parking-location">
                Parking Location: {selectedLocation}
                <button className="change-location-button" onClick={handleChangeLocation}>Change Location</button>
              </div>
              {parkingSpaces.map((row, rowIndex) => (
                <div key={rowIndex} className="parking-row">
                  {row.map((isAvailable, spaceIndex) => (
                    <div
                      key={spaceIndex}
                      className={`parking-space ${isAvailable ? 'available' : 'unavailable'} ${selectedSpace && selectedSpace.rowIndex === rowIndex && selectedSpace.spaceIndex === spaceIndex ? 'selected' : ''}`}
                      onClick={() => handleSelectSpace(rowIndex, spaceIndex)}
                    >
                      {rowIndex + 1}-{spaceIndex + 1}
                      {!isAvailable && (
                        <button className="free-button" onClick={() => handleFreeSpace(rowIndex, spaceIndex)}>Free</button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="reserve-section">
              <div className="selected-and-reserve">
                {selectedSpace ? (
                  <div className="selected-space">
                    Selected Space: {selectedSpace.rowIndex + 1}-{selectedSpace.spaceIndex + 1}
                  </div>
                ) : (
                  <div className="select-space">
                    Please select a parking space.
                  </div>
                )}
                <button disabled={!selectedSpace} className="reserve-button" onClick={handleReserveSpace}>Reserve Space</button>
              </div>
            </div>
          </div>
        )
        :
        <ViewParking parking={props.parking} handleSelectLocation={handleSelectLocation} />
        }
      </div>
      <div className="bottom-section">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;