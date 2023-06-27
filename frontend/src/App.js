import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

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
      {currentPage === "login" && (
        <Login handlePageChange={handlePageChange} handleLogin={handleLogin} />
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
    </div>
  );
}

export default App;