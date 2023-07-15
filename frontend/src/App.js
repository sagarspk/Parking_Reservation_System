import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ControllerLogin from "./components/ControllerLogin";
import ChangePassword from "./components/ChangePassword";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  return (
    <div>
      <header>
        <div className="header-left">
          <h1>Parking Reservation System</h1>
        </div>
        <div className="header-right">
          <Link to="/" className="button" onClick={() => handlePageChange("login")}>
            Login
          </Link>
          <Link to="/" className="button" onClick={() => handlePageChange("signUp")}>
            Register
          </Link>
        </div>
      </header>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {currentPage === "login" && (
                <Login
                  handlePageChange={handlePageChange}
                  handleLogin={handleLogin}
                />
              )}
              {currentPage === "signUp" && (
                <SignUp handlePageChange={handlePageChange} />
              )}
              {currentPage === "forgotPassword" && (
                <ForgotPassword handlePageChange={handlePageChange} />
              )}
              {isLoggedIn && currentPage === "dashboard" && (
                <Dashboard handleLogout={handleLogout} />
              )}
            </>
          }
        />
        <Route
          exact
          path="/controller-login"
          element={<ControllerLogin handleLogin={handleLogin} />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword handlePageChange={handlePageChange} />}
        />
      </Routes>
    </div>
  );
}

export default App;
