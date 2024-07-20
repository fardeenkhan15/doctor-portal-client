import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorLogin from './components/Auth/DoctorLogin';
import DoctorSignup from './components/Auth/DoctorSignup';
import PatientLogin from './components/Auth/PatientLogin';
import PatientSignup from './components/Auth/PatientSignup';
import Dashboard from './components/Dashboard/Dashboard';
import PDFUpload from './components/Dashboard/PDFUpload';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import AddPatientModal from './components/Dashboard/AddPatientModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/:patientId" element={<PatientDashboard userType="patient" />} />
        <Route path="/doctor/patient/:patientId" element={<PatientDashboard userType="doctor" />} />
        <Route path="/doctor/patient/:patientId/upload-pdf" element={<PDFUpload />} />
        <Route path="/add-patient-modal" element={<AddPatientModal />} />
      </Routes>
    </Router>
  );
}

export default App;
