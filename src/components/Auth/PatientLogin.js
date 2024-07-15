import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import loginImage from '../../assets/images/onboarding-img.png'; // Adjust the path according to your folder structure
import logo from '../../assets/icons/logo-full.svg';

const PatientLogin = () => {
  return (
    <div className="doctor-login-container">
      <div className="form-section">
        <div className="logo-container">
          <img src={logo} alt="CarePulse Logo" className="logo" />
        </div>
        <h2>Welcome back,</h2>
        <p>Login to your account, Patient.</p>
        <form>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/patient/signup">Sign up</Link>
        </p>
      </div>
      <div className="image-section">
        <img src={loginImage} alt="Doctor" className="login-image" />
      </div>
    </div>
  );
};

export default PatientLogin;
