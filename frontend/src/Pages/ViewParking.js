import React from "react";



function ViewParking(props) {

  return (
    <div className="select-location-section">
            <label htmlFor="location-select">Select a Parking Location:</label>
            <select id="location-select" onChange={props.handleSelectLocation} className="parking-location-display">
              <option value="">--Please choose a location--</option>
              {props.parking.map((number)=> <option key={number.id} >{number.name}</option>)}
            </select>
            {/* <ol id="location-select" onClick={props.handleSelectLocation}>
              { props.parking.map((value)=> 
                  <li className="parking-location-display" value={value.name}>
                    Name    : { value.name } <br />
                    Price   : {value.price_per_hour} <br/>
                    Location: {value.location} <br/>
                    Status  : {value.is_open? (<button className="status-t">True</button> ): (<button className="status-f">False</button>)}<br/>
                    </li>)}
            </ol> */}
            
         </div>
  )
}

export default ViewParking