import React from 'react';

const PatientLinking = () => {
  return (
    <div className="patient-linking-container">
      <h2>Link Patient</h2>
      <form>
        <label>Doctor ID:</label>
        <input type="text" required />
        <label>Patient ID:</label>
        <input type="text" required />
        <button type="submit">Link</button>
      </form>
    </div>
  );
};

export default PatientLinking;