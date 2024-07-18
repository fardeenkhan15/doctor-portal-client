import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorLogin from './components/Auth/DoctorLogin';
import DoctorSignup from './components/Auth/DoctorSignup';
import PatientLogin from './components/Auth/PatientLogin';
import PatientSignup from './components/Auth/PatientSignup';
import Dashboard from './components/Dashboard/Dashboard';
import PDFUpload from './components/Dashboard/PDFUpload';
import PatientDashboard from './components/Dashboard/PatientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor/patient/:patientId" element={<PatientDashboard userType="doctor" />} />
        <Route path="/patient/patient/:patientId" element={<PatientDashboard userType="patient" />} />
        <Route path="/upload-pdf" element={<PDFUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
