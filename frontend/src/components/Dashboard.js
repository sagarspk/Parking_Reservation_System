import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard(props) {
  const [parkingSpaces, setParkingSpaces] = useState([
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true]
  ]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [points, setPoints] = useState(100);

  const handleLogout = () => {
    props.handleLogout();
  };

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
    setPoints(points - 10);
    setSelectedSpace(null);
  };

  const handleFreeSpace = (rowIndex, spaceIndex) => {
    const updatedSpaces = [...parkingSpaces];
    updatedSpaces[rowIndex][spaceIndex] = true;
    setParkingSpaces(updatedSpaces);
    setPoints(points + 10);
  };

  return (
    <div className="container">
      <div className="top-section">
        <h1 className="title">Parking Reservation System</h1>
        <div className="points-section">
          Points: {points}
        </div>
      </div>
      <div className="parking-box">
        <div className="parking-grid">
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
            {selectedSpace && (
              <div className="selected-space">
                Selected Space: {selectedSpace.rowIndex + 1}-{selectedSpace.spaceIndex + 1}
              </div>
            )}
            <button disabled={!selectedSpace} className="reserve-button" onClick={handleReserveSpace}>Reserve Space</button>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;