import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Profile.css';

function Profile(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="profile-section">
      <img
        className="profile-picture"
        src={require("./profile.png")}
        alt="Profile"
      />
      <span className="profile-name" onClick={handleDropdownClick}>
        Test
      </span>
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <ul>
            <li>Edit Profile</li>
            <li>View History</li>
            <li>
              <Link to="/change-password" className="profile-link">Change Password</Link>
            </li>
            <li onClick={props.handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
