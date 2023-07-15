import React, { useState } from "react";
import "./ChangePassword.css";
import { Link } from "react-router-dom";

function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the change password logic here
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
    } else {
      alert("Password changed successfully!");
      props.handlePageChange("profile");
    }
  };

  return (
    <div className="page-container">
      <div className="change-password-box">
        <form onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <button type="submit">Submit</button>
          <Link to="/" className="cancel-link">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
