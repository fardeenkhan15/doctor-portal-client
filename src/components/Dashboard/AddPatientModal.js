import React, { useState } from 'react';
import Modal from 'react-modal';

const AddPatientModal = ({ isOpen, onRequestClose, availablePatients, linkPatient }) => {
  const [selectedPatient, setSelectedPatient] = useState('');

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    linkPatient(selectedPatient);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Patient Modal"
      ariaHideApp={false}
    >
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Patient:
          <select value={selectedPatient} onChange={handlePatientChange}>
            <option value="">Select a patient</option>
            {availablePatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Link Patient</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AddPatientModal;
