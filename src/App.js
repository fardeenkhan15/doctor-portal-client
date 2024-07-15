import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorLogin from './components/Auth/DoctorLogin';
import DoctorSignup from './components/Auth/DoctorSignup';
import PatientLogin from './components/Auth/PatientLogin';
import PatientSignup from './components/Auth/PatientSignup';
import Dashboard from './components/Dashboard/Dashboard';
import PDFUpload from './components/Dashboard/PDFUpload';
import PatientLinking from './components/Dashboard/PatientLinking';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-pdf" element={<PDFUpload />} />
        <Route path="/link-patient" element={<PatientLinking />} />
      </Routes>
      
    </Router>
  );
}

export default App;
