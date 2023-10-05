import React, { useEffect,useState } from "react";
import { useNavigate, redirect, Link, useLocation  } from "react-router-dom";
import ViewParking from "./ViewParking";
// import KhaltiCheckout from 'khalti-checkout-web'
import apiInstance from './axios';
import axios from 'axios';
import "./Dashboard.css";

function Dashboard(props) {

  const navigate = useNavigate('');
  const location = useLocation();
  // const [parkingSpaces, setParkingSpaces] = useState({});
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [balance, setBalance] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [ isDisabled, setIsDisabled ] = useState(false);

  useEffect(()=>{
    handleBalance();
    handleRequest();
    props.handleAuthentication();
    console.log("parking space test");
    console.log(props.parkingSpaces);
    // handleParkingSpace();
    // props.isLoggedIn? handleReservation(): console.log("Not Logged In");
  },[])
  
  const handleRequest = async()=>{
    // console.log(props.isLoggedIn);
    if(await props.isLoggedIn==true ){
      handleReservation();
    }else{
      navigate('/');
    }
  }

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



  const handleReservation=async()=>{
    try{
      const response = await axios.get(`http://localhost:8000/view_reservation/${props.user.id}`);
      console.log(response.data);
      if(response.status===200){
        props.setReservation(response.data);
      }
    }catch(error){
      console.log(error);
    }
  };

  // const handleParkingSpace= async()=>{
  //   // setSelectedLocation(event.target.value);
  //   try{
  //     const response = await axios.get('http://localhost:8000/view_parking_space');
  //     console.log(response.data);
  //     if(response.status===200){
  //       setParkingSpaces(()=>response.data);
  //     }
  //   }catch(error){
  //     console.error(error);

  //   }
  // }

  
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
    
    // const handleReserveSpace = () => {
      //   const updatedSpaces = [...parkingSpaces];
      //   updatedSpaces[selectedSpace.rowIndex][selectedSpace.spaceIndex] = false;
      //   setParkingSpaces(updatedSpaces);
      //   setBalance(balance - 10);
      //   setSelectedSpace(null);
      // };

      
      // const handleFreeSpace = (rowIndex, spaceIndex) => {
        //   const updatedSpaces = [...parkingSpaces];
  //   updatedSpaces[rowIndex][spaceIndex] = true;
  //   setParkingSpaces(updatedSpaces);
  // };
  
  const handleSelectSpace = (event) => {
    console.log(event.target);
    console.log("Event target ar handle select");
    setSelectedSpace(event.target.value);
    // { props.parkingSpaces[event.target.value]? <button onClick={handleFree}> Free </button>: <button onClick={handleReserve}> Reserve </button> }
    // const rfButton = document.getElementById('myButton');

    // rfButton.addEventListener('click', (event) => {
    //   rfButton.textContent = 
    // });
  };

  const handleReserve = async(event)=>{
    console.log(event.target.value);
    if(props.user.rid){
      alert("You have already reserved a space");
    }else{
      try{
        const response = await apiInstance.put(`reserve/${selectedLocation}`, {
          'spot':event.target.value
        })
        if(response.status===201){
          console.log("reserved")
          try{
            const response1 = await axios.put('http://localhost:8000/user/reserve',{
              uid : props.user.id,
              rid : response.data
            });
            if(response1.status === 200 ){
              console.log("success");
              props.handleParkingSpaces(selectedLocation);
              props.handleAuthentication();
            }
          }catch(error){
            console.error("Error from user reservation")
          }
        }
      }catch(error){
        console.error("Error from parking reservation");
      }
    }
  }
  
  const handleFree = async(event)=>{
    console.log(event.target.value);
    try{
      const response = await apiInstance.patch('free', {
        "id": `${props.user.rid}`
      })
      if(response.status===202){
        console.log("freed")
        try{
          const response1 = await axios.patch('http://localhost:8000/user/free',{
            'id' : props.user.id,
          });
          if(response1.status === 200 ){
            console.log("success");
            props.handleParkingSpaces(selectedLocation);
            props.handleAuthentication();
            // try{
            //   const response2 = await axios.put('http://localhost:8000/user/unload',{
            //     "id": props.user.id,
            //     "balance": paisa
            //   })
            // }catch(error){
            //   console.error("error while charging amount")
            // }
          }
        }catch(error){
          console.error("Error from user reservation")
        }
      }
    }catch(error){
      console.error("Error from parking reservation");
    }
    // redirect('/');
  }

  const handleSelectLocation = (event) => {
    setSelectedLocation(()=> event.target.value);
    console.log(event.target.value);
    props.handleParkingSpaces(event.target.value);
    // console.log(props.selectedLocation);
    console.log("selected location at dashboard");
    // navigate('/dashboard');
  };

  const handleChangeLocation = () => {
    setSelectedLocation(null);
    setSelectedSpace(null);
  };

  return (
    <div className="container">
      <div className="parking-box">
        {selectedLocation ? (
          <div className="parking-grid">
            <div className="parking-head-container">
              <h2>Parking Location : {selectedLocation} </h2>
              <button className="change-location-button" onClick={handleChangeLocation}>Change Location</button>
            </div>
            <div className="parking-space-container">
              {Object.keys(props.parkingSpaces).map((key)=>
                  <button key={key}
                          className={`${props.parkingSpaces[key] ? 'unavailable' : 'available'}`} 
                          value={key} 
                          // onClick={props.parkingSpaces[key] ? handleFree : handleReserve } >
                          onClick ={ props.parkingSpaces[key]? handleFree: handleReserve } >
                      {key}
                  </button>
              )}
              {  <button id="reserve-free"></button>}
              
            </div>
          </div>
        //   <div>
        //     <div className="parking-grid">
        //       <div className="parking-location">
        //         Parking Location: {selectedLocation}
        //         <button className="change-location-button" onClick={handleChangeLocation}>Change Location</button>
        //       </div>
        //       {parkingSpaces.map((row, rowIndex) => (
        //         <div key={rowIndex} className="parking-row">
        //           {row.map((isAvailable, spaceIndex) => (
        //             <div
        //               key={spaceIndex}
        //               className={`parking-space ${isAvailable ? 'available' : 'unavailable'} ${selectedSpace && selectedSpace.rowIndex === rowIndex && selectedSpace.spaceIndex === spaceIndex ? 'selected' : ''}`}
        //               onClick={() => handleSelectSpace(rowIndex, spaceIndex)}
        //             >
        //               {rowIndex + 1}-{spaceIndex + 1}
        //               {!isAvailable && (
        //                 <button className="free-button" onClick={() => handleFreeSpace(rowIndex, spaceIndex)}>Free</button>
        //               )}
        //             </div>
        //           ))}
        //         </div>
        //       ))}
        //     </div>
        //     <div className="reserve-section">
        //       <div className="selected-and-reserve">
        //         {selectedSpace ? (
        //           <div className="selected-space">
        //             Selected Space: {selectedSpace.rowIndex + 1}-{selectedSpace.spaceIndex + 1}
        //           </div>
        //         ) : (
        //           <div className="select-space">
        //             Please select a parking space.
        //           </div>
        //         )}
        //         <button disabled={!selectedSpace} className="reserve-button" onClick={handleReserveSpace}>Reserve Space</button>
        //       </div>
        //     </div>
        //   </div>
        )
        :
        <ViewParking parking={props.parking} handleSelectLocation={handleSelectLocation} />
        }
      </div>
      {/* <div className="bottom-section">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div> */}
    </div>
  );
}

export default Dashboard;