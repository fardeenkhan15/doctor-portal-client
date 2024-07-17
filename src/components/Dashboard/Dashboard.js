import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import logo from '../../assets/icons/logo-full.svg';
import AdminProfile from '../../assets/images/admin.png';

const Dashboard = () => {
  const rowData = [
    { id: 1, name: 'Phoenix Baker', date: 'Jan 4, 2022', status: 'Scheduled', doctor: 'Dr. Alex Ramirez' },
    { id: 2, name: 'Candice Wu', date: 'Jan 2, 2022', status: 'Pending', doctor: 'Dr. Michael May' },
    { id: 3, name: 'Lana Steiner', date: 'Jan 4, 2022', status: 'Cancelled', doctor: 'Dr. Jasmine Lee' },
    { id: 4, name: 'Drew Cano', date: 'Jan 8, 2022', status: 'Scheduled', doctor: 'Dr. Hardik Sharma' },
    { id: 5, name: 'Natali Craig', date: 'Jan 6, 2022', status: 'Pending', doctor: 'Dr. Alyana Cruz' },
  ];

  const columnDefs = [
    { headerName: 'Patient', field: 'name' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Doctor', field: 'doctor' },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: (params) => (
        <button className="bg-blue-500 p-1 rounded" onClick={() => viewPatientDetails(params.value)}>
          View
        </button>
      ),
    },
  ];

  const viewPatientDetails = (id) => {
    console.log(`View details for patient with ID: ${id}`);
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
        <h2 className="text-3xl mb-4">Welcome, Admin</h2>
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
    </div>
  );
};

export default Dashboard;
