import React from 'react';

const Dashboard = () => {
  const patients = [
    { id: 1, name: 'Phoenix Baker', date: 'Jan 4, 2022', status: 'Scheduled', doctor: 'Dr. Alex Ramirez' },
    { id: 2, name: 'Candice Wu', date: 'Jan 2, 2022', status: 'Pending', doctor: 'Dr. Michael May' },
    // Add more patients...
  ];

  return (
    <div className="dashboard-container bg-[#131619] text-white p-12 gap-12 rounded-t-3xl opacity-100 w-[1440px] h-[1024px] mx-auto mt-12">
      <h2 className="text-3xl mb-6">Dashboard</h2>
      <p className="mb-6">Welcome to the healthcare system dashboard.</p>
      
      <div className="summary-cards flex justify-between mb-6">
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <h3 className="text-xl">Total number of patients</h3>
          <p className="text-3xl">{patients.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <h3 className="text-xl">Pending tasks</h3>
          <p className="text-3xl">2</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <h3 className="text-xl">Uploaded PDFs</h3>
          <p className="text-3xl">5</p>
        </div>
      </div>

      <div className="patient-table mb-6">
        <h3 className="text-2xl mb-4">Linked Patients</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Doctor</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2 px-4">{patient.name}</td>
                <td className="py-2 px-4">{patient.date}</td>
                <td className="py-2 px-4">{patient.status}</td>
                <td className="py-2 px-4">{patient.doctor}</td>
                <td className="py-2 px-4">
                  <button className="bg-green-500 p-2 rounded mr-2">View</button>
                  <button className="bg-blue-500 p-2 rounded mr-2">Upload PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pdf-upload mb-6">
        <h3 className="text-2xl mb-4">Upload PDF</h3>
        <form className="flex flex-col gap-4">
          <label>Select PDF:</label>
          <input type="file" accept="application/pdf" required className="text-black p-2 rounded" />
          <button type="submit" className="bg-blue-500 p-2 rounded">Upload</button>
        </form>
      </div>

      <div className="patient-linking">
        <h3 className="text-2xl mb-4">Link Patient</h3>
        <form className="flex flex-col gap-4">
          <label>Doctor ID:</label>
          <input type="text" required className="text-black p-2 rounded" />
          <label>Patient ID:</label>
          <input type="text" required className="text-black p-2 rounded" />
          <button type="submit" className="bg-blue-500 p-2 rounded">Link</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
