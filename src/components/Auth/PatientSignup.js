import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import loginImage from '../../assets/images/onboarding-img.png'; // Adjust the path according to your folder structure
import logo from '../../assets/icons/logo-full.svg';

const PatientSignup = () => {
  return (
    <div className="doctor-login-container">
      <div className="form-section">
        <div className="logo-container">
          <img src={logo} alt="CarePulse Logo" className="logo" />
        </div>
        <h2>Welcome,</h2>
        <p>Create your account, Patient.</p>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/patient/login">Log in</Link>
        </p>
        <p className="doctor-link">
          Or are you a doctor? <Link to="/doctor/login">Log in here</Link>
        </p>
      </div>
      <div className="image-section">
        <img src={loginImage} alt="Doctor" className="login-image" />
      </div>
    </div>
  );
};

export default PatientSignup;
  