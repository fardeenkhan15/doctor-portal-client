import React from 'react';

const PDFUpload = () => {
  return (
    <div className="pdf-upload-container bg-[#131619] text-white p-6 gap-6 rounded-t-lg w-full h-full mx-auto mt-6">
      <h2 className="text-2xl mb-4">Upload PDF</h2>
      <form className="flex flex-col gap-4">
        <label>Select PDF:</label>
        <input type="file" accept="application/pdf" required className="text-black p-2 rounded" />
        <button type="submit" className="bg-blue-500 p-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default PDFUpload;
