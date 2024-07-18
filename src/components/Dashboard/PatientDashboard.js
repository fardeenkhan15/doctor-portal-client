import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PatientDashboard = ({ userType }) => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [comments, setComments] = useState('');
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    // Fetch patient data using patientId
    fetch(`/api/patients/${patientId}`)
      .then(response => response.json())
      .then(data => setPatientData(data))
      .catch(error => console.error('Error fetching patient data:', error));
  }, [patientId]);

  const handleAddComment = () => {
    if (comments) {
      const newComments = [...allComments, comments];
      setAllComments(newComments);
      setComments('');
      // Save comments to database
      fetch(`/api/patients/${patientId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: comments }),
      })
      .catch(error => console.error('Error adding comment:', error));
    }
  };

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="bg-[#131619] text-white p-6 gap-6 w-full h-full mx-auto overflow-hidden">
      <h2 className="text-3xl mb-4">{userType === 'doctor' ? `Patient: ${patientData.name}` : `Welcome, ${patientData.name}`}</h2>
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
    </div>
  );
};

export default PatientDashboard;
