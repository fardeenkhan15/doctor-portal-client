import React from 'react';

const PDFUpload = () => {
  return (
    <div className="pdf-upload-container">
      <h2>Upload PDF</h2>
      <form>
        <label>Select PDF:</label>
        <input type="file" accept="application/pdf" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default PDFUpload;