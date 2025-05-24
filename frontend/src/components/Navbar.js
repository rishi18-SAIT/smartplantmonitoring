// Navbar.js
import React from 'react';
import './Navbar.css'; // Link the CSS for styling
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaLeaf className="logo-icon" />
        <span className="navbar-brand">Smart-Plant-Monitoring</span>
      </div>
      <div className="navbar-right">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/add-plant" className="nav-link">Add Plant</Link>
        <Link to="/view-plants" className="nav-link">View Plants</Link>
        <Link to="/alerts" className="nav-link">Alerts</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <Link to="/logout" className="nav-link">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
