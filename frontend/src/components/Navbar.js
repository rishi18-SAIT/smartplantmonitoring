import React from "react";
import "./Navbar.css"; // Link the CSS for styling
import { FaLeaf } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import authService from "../api/authService"; // ✨ Import the auth service

const Navbar = () => {
  const navigate = useNavigate();
  const token = authService.getCurrentUserToken(); // ✨ Check if a token exists

  const handleLogout = () => {
    authService.logout(); // ✨ Clear the token
    navigate("/login");   // ✨ Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaLeaf className="logo-icon" />
        <span className="navbar-brand">AgriLeaf Guard</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        
        {/* ✨ Use a ternary operator to show links conditionally ✨ */}
        {token ? (
          // Logged-in user links
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {/* <Link to="/add-plant" className="nav-link">Add Plant</Link> */}
            <Link to="/view-plants" className="nav-link">View Plants</Link>
              <Link to="/aifeatures" className="nav-link">AI Features</Link>
            <Link to="/alerts" className="nav-link">Alerts</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
             
             
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </>
        ) : (
          // Logged-out user links
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;