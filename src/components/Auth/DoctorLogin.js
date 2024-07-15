import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import loginImage from '../../assets/images/onboarding-img.png'; // Adjust the path according to your folder structure
import logo from '../../assets/icons/logo-full.svg';

const DoctorLogin = () => {
  return (
    <div className="doctor-login-container">
      <div className="form-section">
        <div className="logo-container">
          <img src={logo} alt="CarePulse Logo" className="logo" />
        </div>
        <h2>Hi there,</h2>
        <p>Welcome back, Doctor.</p>
        <form>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          <button type="submit">Get Started</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/doctor/signup">Sign up</Link>
        </p>
        <p className="patient-link">
          Or are you a patient? <Link to="/patient/login">Log in here</Link>
        </p>
      </div>
      <div className="image-section">
        <img src={loginImage} alt="Doctor" className="login-image" />
      </div>
    </div>
  );
};

export default DoctorLogin;
