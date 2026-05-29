// Upload Box Component - drag and drop file upload
// Used in verify certificate page

import React, { useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

const UploadBox = ({ onFileSelect, accept = ".pdf, .png, .jpg, .jpeg, .gif" }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragActive
          ? "border-indigo-600 bg-indigo-50"
          : "border-gray-300 hover:border-indigo-400"
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />

      <label htmlFor="file-input" className="cursor-pointer">
        {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={40} className="text-green-500" />
            <p className="font-semibold text-gray-800">{selectedFile.name}</p>
            <p className="text-sm text-gray-600">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <p className="text-sm text-green-600 font-semibold">
              File selected! Click to change
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={40} className="text-indigo-600" />
            <p className="font-semibold text-gray-800">
              Drag and drop your certificate here
            </p>
            <p className="text-sm text-gray-600">
              or click to browse files (PDF, JPG, PNG)
            </p>
            <p className="text-xs text-gray-500">Max file size: 10 MB</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default UploadBox;
