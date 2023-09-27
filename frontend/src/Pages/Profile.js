import React from 'react';
import "./Profile.css";
import { Link, useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div>
        <Link to="/dashboard" className="button" onClick={() => navigate('/dashboard')}>
          Back
        </Link>
      </div>
      <div className="profile-details">
        <h2>Name: John Doe</h2>
        <p>Address: 123 Main Street</p>
        <p>Contact: john.doe@example.com</p>
      </div>
      <h2>Booking History</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Booking ID</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-09-25</td>
            <td>12345</td>
            <td>Booking details...</td>
          </tr>
          <tr>
            <td>2023-09-23</td>
            <td>67890</td>
            <td>Booking details...</td>
          </tr>
          {/* Add more rows for additional booking history */}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;