import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PDFUpload = ({ onUploadSuccess }) => {
  const { patientId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePdfSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId);

    try {
      const response = await axios.post('http://localhost:5000/doctor/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('PDF uploaded successfully:', response.data);
      toast.success('PDF uploaded successfully');
      if (onUploadSuccess && typeof onUploadSuccess === 'function') {
        onUploadSuccess(response.data.filePath);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setError('Error uploading PDF');
      toast.error('Error uploading PDF');
    }
  };

  return (
    <div className="pdf-upload-container bg-[#131619] text-white p-4 rounded-lg w-full max-w-md mx-auto mt-4">
      <h2 className="text-xl mb-3">Upload PDF</h2>
      <form className="flex flex-col gap-3" onSubmit={handlePdfSubmit}>
        <div className="flex items-center">
          <label className="mr-2">Select PDF:</label>
          <input type="file" accept="application/pdf" required className="text-sm text-gray-300" onChange={handleFileChange} />
        </div>
        <button type="submit" className="bg-blue-500 p-2 rounded text-sm w-24 self-end">Upload</button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PDFUpload; 