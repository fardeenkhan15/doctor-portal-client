import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAvailablePatients, linkPatientToDoctor } from '../../services/api';
import './modal.css'; // Import the modal CSS file

const AddPatientModal = ({ isOpen, onRequestClose, fetchPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [availablePatients, setAvailablePatients] = useState([]);

  useEffect(() => {
    const fetchAvailablePatients = async () => {
      if (isOpen) {
        try {
          const patients = await getAvailablePatients();
          setAvailablePatients(patients);
        } catch (error) {
          console.error('An error occurred while fetching available patients', error);
        }
      }
    };

    fetchAvailablePatients();
  }, [isOpen]);

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) {
      console.error('No patient selected');
      return;
    }
    try {
      console.log('PatientId being sent:', selectedPatient);
      await linkPatientToDoctor(selectedPatient);
      fetchPatients(); // Call this to refresh the patient list
      onRequestClose(); // Close the modal
      setSelectedPatient(''); // Reset the selected patient
    } catch (error) {
      console.error('An error occurred while linking the patient', error);
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Patient Modal" ariaHideApp={false} className="custom-modal" overlayClassName="custom-overlay">
      <h2 className="modal-title">Add Patient</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <label className="modal-label">
          Select Patient:
          <select value={selectedPatient} onChange={handlePatientChange} className="modal-select">
            <option value="">Select a patient</option>
            {availablePatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </label>
        <div className="modal-buttons">
          <button type="submit" className="modal-button-link">Link Patient</button>
          <button type="button" onClick={onRequestClose} className="modal-button-close">Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPatientModal;
