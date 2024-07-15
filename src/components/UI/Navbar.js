// src/components/UI/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Healthcare System" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/doctor/login">Doctor Login</Link></li>
        <li><Link to="/doctor/signup">Doctor Signup</Link></li>
        <li><Link to="/patient/login">Patient Login</Link></li>
        <li><Link to="/patient/signup">Patient Signup</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
