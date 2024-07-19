import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { patients } from './mockData'; // Import the mock data

const PatientDashboard = ({ userType }) => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [comments, setComments] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Fetch patient data from the mock data using patientId
    const patient = patients.find(p => p.id === parseInt(patientId));
    if (patient) {
      setPatientData(patient);
      setAllComments(patient.comments || []);
      setPdfUrl(patient.pdfUrl || '');
    }
  }, [patientId]);

  const handleAddComment = () => {
    if (comments) {
      const newComments = [...allComments, comments];
      setAllComments(newComments);
      setComments('');
      // Save comments to database or mock data
      fetch(`/api/patients/${patientId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: comments }),
      }).catch(error => console.error('Error adding comment:', error));
    }
  };

  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePdfSubmit = (e) => {
    e.preventDefault();
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile);

      fetch(`/api/patients/${patientId}/pdf`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setPdfUrl(data.pdfUrl);
          setPdfFile(null);
        })
        .catch(error => console.error('Error uploading PDF:', error));
    }
  };

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="bg-[#131619] h-screen text-white p-6 gap-6 w-full mx-auto overflow-hidden">
      <h2 className="text-3xl mb-4">
        {userType === 'doctor' ? `Patient: ${patientData.name}` : `Welcome, ${patientData.name}`}
      </h2>
      <div className="mb-4">
        <p><strong>Age:</strong> {patientData.age}</p>
        <p><strong>Address:</strong> {patientData.address}</p>
        <p><strong>Medical History:</strong> {patientData.medicalHistory}</p>
        <p><strong>Current Problems:</strong> {patientData.currentProblems}</p>
      </div>
      {userType === 'patient' && (
        <div className="mb-4">
          <h3 className="text-2xl mb-2">Add Additional Comments</h3>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border rounded border-gray-300 text-black"
          />
          <button onClick={handleAddComment} className="bg-green-500 p-2 rounded mt-2">Add Comment</button>
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-2xl mb-2">Comments</h3>
        {allComments.map((comment, index) => (
          <p key={index} className="mb-2">{comment}</p>
        ))}
      </div>
      {userType === 'doctor' && (
        <div className="pdf-upload-container bg-[#131619] text-white p-6 gap-6 rounded-t-lg w-full mx-auto mt-6">
          <h2 className="text-2xl mb-4">Upload PDF</h2>
          <form className="flex flex-col gap-4" onSubmit={handlePdfSubmit}>
            <label>Select PDF:</label>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} required className="text-black p-2 rounded" />
            <button type="submit" className="bg-blue-500 p-2 rounded">Upload</button>
          </form>
        </div>
      )}
      {pdfUrl && (
        <div className="mb-4">
          <h3 className="text-2xl mb-2">Uploaded PDF</h3>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download PDF</a>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
