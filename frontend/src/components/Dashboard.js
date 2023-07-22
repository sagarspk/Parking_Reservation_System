import React, { useEffect,useState } from "react";
import axios from 'axios';
import "./Dashboard.css";

function Dashboard(props) {
  const [parkingSpaces, setParkingSpaces] = useState([
    [true, true, true, true, true],
    [true, true, true, true, true]
  ]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [balance, setBalance] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

  const handleSelectSpace = (rowIndex, spaceIndex) => {
    if (selectedSpace && selectedSpace.rowIndex === rowIndex && selectedSpace.spaceIndex === spaceIndex) {
      setSelectedSpace(null);
    } else {
      setSelectedSpace({ rowIndex, spaceIndex });
    }
  };



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

  const handleProfileDropdownClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="container">
      <h1 className="title">Parking Reservation System</h1>
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
        ) : (
          <div className="select-location-section">
            <label htmlFor="location-select">Select a Parking Location:</label>
            <select id="location-select" onChange={handleSelectLocation}>
              <option value="">--Please choose a location--</option>
              <option value="Location 1">Location 1</option>
              <option value="Location 2">Location 2</option>
              <option value="Location 3">Location 3</option>
            </select>
         </div>
        )}
      </div>
      <div className="bottom-section">
        {/* <form action="https://uat.esewa.com.np/epay/transrec" method="GET">
        <input value="100" name="amt" type="hidden">
        <input value="EPAYTEST" name="scd" type="hidden">
        <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden">
        <input value="000AE01" name="rid" type="hidden">
        <input value="Submit" type="submit">
        </form> */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;