// Issue Certificate Page - University can issue new certificates
// Form to collect certificate details and upload file

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { issueCertificate } from "../api/api";
import { AlertCircle, CheckCircle, FileUp } from "lucide-react";

const IssueCertificate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not university
  if (user && user.role !== "university") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-red-700 mb-2">Access Denied</h3>
            <p className="text-red-600">
              Only universities can issue certificates
            </p>
          </div>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentId: "",
    programName: "",
    batchYear: "",
    certificateId: "",
    issueDate: ""
  });

  const [certificateFile, setCertificateFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (
        !formData.studentName ||
        !formData.studentEmail ||
        !formData.studentId ||
        !formData.programName ||
        !formData.batchYear ||
        !formData.certificateId ||
        !formData.issueDate ||
        !certificateFile
      ) {
        setError("Please fill in all fields and select a certificate file");
        setLoading(false);
        return;
      }

      // Create FormData for multipart upload
      const uploadFormData = new FormData();
      uploadFormData.append("studentName", formData.studentName);
      uploadFormData.append("studentEmail", formData.studentEmail);
      uploadFormData.append("studentId", formData.studentId);
      uploadFormData.append("universityName", user.universityName);
      uploadFormData.append("programName", formData.programName);
      uploadFormData.append("batchYear", formData.batchYear);
      uploadFormData.append("certificateId", formData.certificateId);
      uploadFormData.append("issueDate", formData.issueDate);
      uploadFormData.append("certificate", certificateFile);

      // Call API
      const response = await issueCertificate(uploadFormData);

      if (response.data.success) {
        setSuccess(true);
        setSuccessData(response.data.data);
        setFormData({
          studentName: "",
          studentEmail: "",
          studentId: "",
          programName: "",
          batchYear: "",
          certificateId: "",
          issueDate: ""
        });
        setCertificateFile(null);

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/university-dashboard");
        }, 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to issue certificate"
      );
    } finally {
      setLoading(false);
    }
  };

  // Success message
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={40} className="text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-green-700">
                  Certificate Issued Successfully!
                </h2>
                <p className="text-green-600">
                  The certificate has been uploaded and stored on the blockchain.
                </p>
              </div>
            </div>

            {successData && (
              <div className="bg-white p-6 rounded-lg mb-6">
                <p className="mb-2">
                  <span className="font-semibold">Student:</span>{" "}
                  {successData.studentName}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Certificate ID:</span>{" "}
                  {successData.certificateId}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Blockchain Hash:</span>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
                    {successData.certificateHash.substring(0, 20)}...
                  </code>
                </p>
                {successData.qrCode && (
                  <div>
                    <p className="font-semibold mb-2">QR Code:</p>
                    <img
                      src={successData.qrCode}
                      alt="QR Code"
                      className="w-48 h-48 border-2 border-indigo-300 rounded"
                    />
                  </div>
                )}
              </div>
            )}

            <p className="text-gray-600">
              Redirecting to dashboard in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileUp className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Issue Certificate</h1>
          </div>
          <p className="text-gray-600">
            Fill in the certificate details and upload the certificate file
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Student Information */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Student Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Student Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Student Email *
              </label>
              <input
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="john@university.edu"
                required
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Student ID *
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="STU-2024-001"
                required
              />
            </div>

            {/* University Name (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                University
              </label>
              <input
                type="text"
                value={user?.universityName || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>

          {/* Program Information */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
            Program Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Program Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Program Name *
              </label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="Bachelor of Science in Computer Science"
                required
              />
            </div>

            {/* Batch Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Batch Year *
              </label>
              <input
                type="text"
                name="batchYear"
                value={formData.batchYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="2024"
                required
              />
            </div>
          </div>

          {/* Certificate Details */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
            Certificate Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Certificate ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Certificate ID *
              </label>
              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="CERT-2024-001"
                required
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
            Certificate File
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Upload Certificate (PDF or Image) *
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              required
            />
            <p className="text-sm text-gray-600 mt-2">
              {certificateFile
                ? `Selected: ${certificateFile.name}`
                : "Select a PDF or image file (max 10 MB)"}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Issuing Certificate..." : "Issue Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;
