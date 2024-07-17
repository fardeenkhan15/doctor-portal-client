import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddPatientModal = ({ isOpen, onRequestClose, patients, linkPatient }) => {
  const [selectedPatient, setSelectedPatient] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    linkPatient(selectedPatient);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Patient Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl mb-4">Link Patient</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Available Patients:</label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          required
          className="text-black p-2 rounded"
        >
          <option value="" disabled>Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name} - {patient.problem}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 p-2 rounded">Link</button>
      </form>
    </Modal>
  );
};

export default AddPatientModal;
