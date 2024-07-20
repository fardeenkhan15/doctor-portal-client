import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPatientById, getCommentsByPatientId, addComment } from '../../services/api';
import PDFUpload from './PDFUpload';
import logo from '../../assets/icons/logo-full.svg';
import AdminProfile from '../../assets/images/admin.png';

const PatientDashboard = ({ userType }) => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [comments, setComments] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getPatientById(patientId);
        setPatientData(data);
        if (data.PDFs && data.PDFs.length > 0) {
          setPdfUrl(data.PDFs[0].filePath);
        }

        const commentsData = await getCommentsByPatientId(patientId);
        setAllComments(commentsData);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        toast.error('Error fetching patient data');
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleAddComment = async () => {
    if (comments) {
      try {
        await addComment(patientId, comments);
        setAllComments([...allComments, { content: comments }]);
        setComments('');
        toast.success('Comment added successfully');
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error('Error adding comment');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorId');
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handlePDFUploadSuccess = (url) => {
    setPdfUrl(url);
    toast.success('PDF uploaded successfully');
  };

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="bg-[#131619] min-h-screen text-white p-6 gap-6 w-full mx-auto overflow-hidden">
      <ToastContainer />
      <nav className="flex items-center rounded-t-2xl rounded-b-2xl justify-between p-4 bg-black">
        <img src={logo} alt="CarePulse Logo" className="h-10" />
        <div className="flex items-center">
          <div className="relative">
            <img src={AdminProfile} alt="Admin Profile" className="h-10 w-10 rounded-full" />
          </div>
          {userType === 'doctor' && (
            <button onClick={handleBackToDashboard} className="ml-4 bg-gray-500 p-2 rounded text-white">Back to Dashboard</button>
          )}
          <button onClick={handleLogout} className="ml-4 bg-red-500 p-2 rounded text-white">Logout</button>
        </div>
      </nav>
      
      <div className="p-6">
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
          {allComments.length > 0 ? (
            allComments.map((comment, index) => (
              <p key={index} className="mb-2">{comment.content}</p>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        {userType === 'doctor' && (
          <PDFUpload patientId={patientId} onUploadSuccess={handlePDFUploadSuccess} />
        )}
        {pdfUrl && (
          <div className="mb-4">
            <h3 className="text-2xl mb-2">Uploaded PDF</h3>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download PDF</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;