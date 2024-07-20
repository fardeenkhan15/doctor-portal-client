import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../../assets/images/onboarding-img.png';
import logo from '../../assets/icons/logo-full.svg';
import { signupDoctor } from '../../services/api';

const DoctorSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await signupDoctor(formData);
        toast.success('Signup successful! Please log in.');
        setTimeout(() => {
          navigate('/doctor/login');
        }, 2000);
      } catch (error) {
        setServerError(error.response?.data?.error || 'Signup failed');
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#131619]">
      <ToastContainer/>
      <div className="flex flex-col justify-center flex-1 px-8 py-4 bg-[#131619]">
        <div className="mb-3">
          <img src={logo} alt="CarePulse Logo" className="h-10" />
        </div>
        <h2 className="mb-0 text-2xl font-bold text-white">Welcome,</h2>
        <p className="mb-4 text-white">Create your account, Doctor.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-white">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded border-gray-300"
              required
            />
            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
          </div>
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
          <div className="mb-4">
            <label htmlFor="specialty" className="block mb-2 text-white">Specialty</label>
            <input
              type="text"
              id="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded border-gray-300"
              required
            />
            {errors.specialty && <p className="mt-2 text-sm text-red-500">{errors.specialty}</p>}
          </div>
          <button type="submit" className="w-full px-4 py-2 mt-0 text-white bg-green-500 rounded">Sign Up</button>
          {serverError && <p className="mt-2 text-sm text-red-500">{serverError}</p>}
        </form>
        <div className="flex justify-between text-sm text-green-500">
          <Link to="/doctor/login">Already have an account? Log in</Link>
          <Link to="/patient/signup">Or are you a patient? Sign up here</Link>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 bg-white">
        <img src={loginImage} alt="Doctor" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default DoctorSignup;
