import { Link, useNavigate, useLocation } from "react-router-dom";
import './Header.css';
import { useEffect } from "react";

function Header(props) {

    const navigate = useNavigate('');
    const location = useLocation();
    console.log(location.pathname);


    return (
        <>
            <header>
                <h2 className="logo">Parking Reservation System</h2>
                    {props.isLoggedIn ?
                        <>
                        <nav className="navigation">
                            <div className="balance">
                                Rs. {props.user.balance}
                            </div>
                            { location.pathname== '/profile' ?
                                <Link to='/dashboard' className="a">
                                    Dashboard
                                </Link>    
                                :
                                <Link to="/profile" className="a" >
                                    {/* <img className="profile-picture" src={require("./profile.png")} alt="Profile" /> */}
                                    {props.user.firstName + ' ' + props.user.lastName}
                                </Link>
                            }
                                <button className="btnLogin-popup" onClick={props.handleLogout}>Logout</button>
                        </nav>    
                        </>
                        :
                        <>
                        <nav className="navigation">
                            <Link to="/" className="a">
                                Home
                            </Link>
                            <Link to="/" className="a">
                                About Us
                            </Link>
                            <Link to="/register" className="a">
                                Register
                            </Link>
                        </nav>
                        </>
                    }
            </header>
        </>
    )
}

export default Header