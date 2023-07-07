import React from "react";

const FileInput = ({ onFileSelect }) => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div className="cpm-select-file">
      <label className="select-label" htmlFor="fileInput">
        Select a CSV file:
        <input type="file" onChange={handleFileSelect} accept=".csv" />
      </label>
    </div>
  );
};

export default FileInput;
