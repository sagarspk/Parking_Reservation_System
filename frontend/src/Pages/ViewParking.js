import React from "react";



function ViewParking(props) {

  return (
    <div className="select-location-section">
            <label htmlFor="location-select">Select a Parking Location:</label>
            <select id="location-select" onChange={props.handleSelectLocation}>
              <option value="">--Please choose a location--</option>
              {props.parking.map((number)=> <option key={number.id} >{number.name}</option>)}
            </select>
            
         </div>
  )
}

export default ViewParking