import React from 'react';

const DoctorLogin = () => {
  return (
    <div className="auth-container">
      <h2>Doctor Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DoctorLogin;