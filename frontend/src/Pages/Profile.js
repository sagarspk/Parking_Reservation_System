import React from 'react';
import {Link, useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
  // const location = useLocation();
  

  return (
    <div>
      <h1>Profile Pages</h1>
      <div>
        <Link to="/dashboard" className="button" onClick={() => navigate('/dashboard')}>
          Back
        </Link>
      </div>
    </div>
    
  )
}

export default Profile