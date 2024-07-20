import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/icons/logo-full.svg';
import AdminProfile from '../../assets/images/admin.png';
import AddPatientModal from './AddPatientModal';
import { getPatientsByDoctor, getAvailablePatients, linkPatientToDoctor, getPDFsByDoctorId } from '../../services/api';
import './App.css';

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [availablePatients, setAvailablePatients] = useState(0);
  const [totalPDFs, setTotalPDFs] = useState(0);
  const navigate = useNavigate();
  const doctorId = localStorage.getItem('doctorId');

  const columnDefs = [
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1 },
    { headerName: 'Age', field: 'age', flex: 1 },
    {
      headerName: 'Actions',
      field: 'id',
      flex: 1,
      cellRenderer: (params) => (
        <button
          className="bg-blue-500 p-1 rounded text-white"
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

  const fetchPatients = useCallback(async () => {
    try {
      const patients = await getPatientsByDoctor(doctorId);
      setRowData(patients);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login');
        navigate('/doctor/login');
      } else {
        console.error('An error occurred while fetching patients', error);
      }
    }
  }, [doctorId, navigate]);

  const fetchAvailablePatients = useCallback(async () => {
    try {
      const patients = await getAvailablePatients();
      setAvailablePatients(patients.length);
    } catch (error) {
      console.error('An error occurred while fetching available patients', error);
    }
  }, []);

  const fetchTotalPDFs = useCallback(async () => {
    try {
      const pdfs = await getPDFsByDoctorId(doctorId);
      setTotalPDFs(pdfs.length);
    } catch (error) {
      console.error('An error occurred while fetching PDFs', error);
    }
  }, [doctorId]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/doctor/login');
    } else {
      fetchPatients();
      fetchAvailablePatients();
      fetchTotalPDFs();
    }
  }, [fetchPatients, fetchAvailablePatients, fetchTotalPDFs, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorId');
    navigate('/doctor/login');
  };

  const handleLinkPatient = async (patientId) => {
    try {
      await linkPatientToDoctor(patientId);
      toast.success('Patient linked successfully');
      fetchPatients();
      fetchAvailablePatients();
    } catch (error) {
      console.error('Error linking patient:', error);
      toast.error('Failed to link patient');
    }
  };

  return (
    <div className="bg-[#131619] text-white p-6 gap-6 w-full h-screen mx-auto overflow-hidden flex flex-col">
      <ToastContainer />
      <nav className="flex items-center rounded-t-2xl rounded-b-2xl justify-between p-4 bg-black">
        <img src={logo} alt="CarePulse Logo" className="h-10" />
        <div className="flex items-center">
          <div className="relative">
            <img src={AdminProfile} alt="Admin Profile" className="h-10 w-10 rounded-full" />
          </div>
          <button onClick={handleLogout} className="ml-4 bg-red-500 p-2 rounded text-white">Logout</button>
        </div>
      </nav>
      
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl">Welcome, Admin</h2>
          <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 p-2 rounded">Add Patient</button>
        </div>
        <p className="mb-4">Start day with managing new appointments</p>

        <div className="summary-cards flex justify-between mb-4">
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of linked patients</h3>
            <p className="text-2xl">{rowData.length}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of patients available</h3>
            <p className="text-2xl">{availablePatients}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of PDFs uploaded</h3>
            <p className="text-2xl">{totalPDFs}</p>
          </div>
        </div>

        <div className="patient-table flex-grow overflow-hidden">
          <h3 className="text-2xl mb-2">Linked Patients</h3>
          <div className="ag-theme-alpine-dark h-full w-full">
            <AgGridReact 
              rowData={rowData} 
              columnDefs={columnDefs} 
              pagination={true} 
              paginationPageSize={10} 
              paginationPageSizeSelector={[10, 20, 50, 100]}
              domLayout='autoHeight'
            />
          </div>
        </div>
      </div>

      <AddPatientModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        fetchPatients={fetchPatients}
        onLinkPatient={handleLinkPatient}
      />
    </div>
  );
};

export default Dashboard;