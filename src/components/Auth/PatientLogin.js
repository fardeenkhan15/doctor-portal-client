import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/images/onboarding-img.png'; // Adjust the path according to your folder structure
import logo from '../../assets/icons/logo-full.svg';

const PatientLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit the form
      console.log(formData);
    }
  };

  return (
    <div className="flex h-screen bg-[#131619]">
      <div className="flex flex-col justify-center flex-1 px-8 py-4 bg-[#131619]">
        <div className="mb-3">
          <img src={logo} alt="CarePulse Logo" className="h-10" />
        </div>
        <h2 className="mb-0 text-2xl font-bold text-white">Welcome back,</h2>
        <p className="mb-4 text-white">Login to your account, Patient.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white">Email address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded border-gray-300"
              required
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-white">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded border-gray-300"
              required
            />
            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full px-4 py-2 mt-0 text-white bg-green-500 rounded">Login</button>
        </form>
        <div className="flex justify-between text-sm text-green-500">
          <Link to="/patient/signup">Don't have an account? Sign up</Link>
          <Link to="/doctor/login">Or are you a doctor? Log in here</Link>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 bg-white">
        <img src={loginImage} alt="Doctor" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default PatientLogin;
