import axios from 'axios';

const API_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_URL;

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication APIs
export const loginDoctor = async (credentials) => {
  const response = await axiosInstance.post('/auth/doctor/login', credentials);
  return response.data;
};

export const signupDoctor = async (credentials) => {
  return await axiosInstance.post('/auth/doctor/signup', credentials);
};

export const loginPatient = async (credentials) => {
  const response = await axiosInstance.post('/auth/patient/login', credentials);
  return response.data;
};

export const signupPatient = async (credentials) => {
  return await axiosInstance.post('/auth/patient/signup', credentials);
};

export const getPatientsByDoctor = async () => {
  const response = await axiosInstance.get('/patient', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  console.log(' patients:', response.data);

  return response.data;
};

export const linkPatientToDoctor = async (PatientId, fetchPatients) => {
  try {
    console.log('PatientId in linkPatientToDoctor:', PatientId);
    const response = await axios.post('/doctor/link-patient', { PatientId }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    getPatientsByDoctor(); // Call fetchPatients to update the state
    return response.data;
  } catch (error) {
    console.error('Error in linkPatientToDoctor:', error.response?.data || error.message);
    throw error;
  }
};


export const getAvailablePatients = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token used for authentication:', token); // Add this line
    const response = await axiosInstance.get('/patient/available', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Available patients:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getAvailablePatients:', error);
    throw error;
  }
};

export const getPatientById = async (patientId) => {
  const response = await axiosInstance.get(`/patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const uploadPDF = async (formData) => {
  const response = await axiosInstance.post('/doctor/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken()}`, // Ensure the token is included in the headers
    },
  });
  return response.data;
};


export const getCommentsByPatientId = async (patientId) => {
  const response = await axiosInstance.get(`/doctor/${patientId}/comments`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const addComment = async (patientId, comment) => {
  const response = await axiosInstance.post(`/patient/${patientId}/comments`, { comment }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
export const getPDFsByDoctorId = async (doctorId) => {
  try {
    const response = await axiosInstance.get(`/doctor/${doctorId}/pdfs`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    throw error;
  }
};