import { Link, useNavigate, useLocation } from "react-router-dom";
import '../App.css';
import { useEffect } from "react";

function Header(props) {

    const navigate = useNavigate('');
    const location = useLocation();
    console.log(location.pathname);


    return (
        <>
            <header>
                <div className="header-left">
                    <h1>Parking Reservation System</h1>
                </div>
                <div className="header-right">
                    {props.isLoggedIn ?
                        <>
                            <div className="points-section">
                                Balance: Rs{props.user.balance}
                            </div>
                            <Link to="/profile" className="button">
                                <img className="profile-picture" src={require("./profile.png")} alt="Profile" />
                                {props.user.firstName + ' ' + props.user.lastName}
                            </Link>
                            <div className="bottom-section">
                                <button className="logout-button" onClick={props.handleLogout}>Logout</button>
                            </div>
                            
                        </>
                        :
                        <>
                            <Link to="/" className="button">
                                Home
                            </Link>
                            <Link to="/" className="button">
                                About Us
                            </Link>
                            <Link to="/register" className="button">
                                Register
                            </Link>
                        </>
                    }
                </div>
            </header>
        </>
    )
}

export default Header