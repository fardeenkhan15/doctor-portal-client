import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import logo from '../../assets/icons/logo-full.svg';
import AdminProfile from '../../assets/images/admin.png';
import AddPatientModal from './AddPatientModal';
import { patients } from './mockData'; // Import the mock data
import './App.css';

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState(patients); // Use the mock data

  const navigate = useNavigate();

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Age', field: 'age' },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: (params) => (
        <button
          className="bg-blue-500 p-1 rounded"
          onClick={() => viewPatientDetails(params.data.id)}
        >
          View
        </button>
      ),
    },
  ];

  const viewPatientDetails = (id) => {
    navigate(`/doctor/patient/${id}`);
  };

  const availablePatients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', age: 35 },
  ];

  const linkPatient = (patientId) => {
    const patient = availablePatients.find(p => p.id === parseInt(patientId));
    const newPatient = {
      id: rowData.length + 1,
      name: patient.name,
      email: patient.email,
      age: patient.age,
    };
    setRowData([...rowData, newPatient]);
    setModalIsOpen(false);
  };

  return (
    <div className="bg-[#131619] text-white p-6 gap-6 w-full h-full mx-auto overflow-hidden">
      <nav className="flex items-center rounded-t-2xl rounded-b-2xl justify-between p-4 bg-black">
        <img src={logo} alt="CarePulse Logo" className="h-10" />
        <div className="flex items-center">
          <div className="relative">
            <img src={AdminProfile} alt="Admin Profile" className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </nav>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl">Welcome, Admin</h2>
          <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 p-2 rounded">Add Patient</button>
        </div>
        <p className="mb-4">Start day with managing new appointments</p>

        <div className="summary-cards flex justify-between mb-4">
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of linked patients</h3>
            <p className="text-2xl">5</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of patients available</h3>
            <p className="text-2xl">32</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of PDFs uploaded</h3>
            <p className="text-2xl">56</p>
          </div>
        </div>

        <div className="patient-table mb-4">
          <h3 className="text-2xl mb-2">Linked Patients</h3>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
          </div>
        </div>
      </div>

      <AddPatientModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        availablePatients={availablePatients}
        linkPatient={linkPatient}
      />
    </div>
  );
};

export default Dashboard;
