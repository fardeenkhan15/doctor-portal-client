import React from 'react';

const DoctorSignup = () => {
  return (
    <div className="auth-container">
      <h2>Doctor Signup</h2>
      <form>
        <label>Name:</label>
        <input type="text" required />
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default DoctorSignup;