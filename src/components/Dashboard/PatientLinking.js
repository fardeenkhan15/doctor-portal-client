import React from 'react';

const PatientLinking = () => {
  return (
    <div className="patient-linking-container bg-[#131619] text-white p-6 gap-6 rounded-t-lg w-full h-full mx-auto mt-6">
      <h2 className="text-2xl mb-4">Link Patient</h2>
      <form className="flex flex-col gap-4">
        <label>Doctor ID:</label>
        <input type="text" required className="text-black p-2 rounded" />
        <label>Patient ID:</label>
        <input type="text" required className="text-black p-2 rounded" />
        <button type="submit" className="bg-blue-500 p-2 rounded">Link</button>
      </form>
    </div>
  );
};

export default PatientLinking;
