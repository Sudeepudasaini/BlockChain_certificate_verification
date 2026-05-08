// Verify Certificate Page
// Two methods: upload file or enter certificate ID

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCertificateByUpload, verifyCertificateById } from "../api/api";
import UploadBox from "../components/UploadBox";
import { AlertCircle, Search } from "lucide-react";

const VerifyCertificate = () => {
  const [method, setMethod] = useState("upload"); // 'upload' or 'id'
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateId, setCertificateId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setCertificateFile(file);
  };

  const handleVerifyByUpload = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!certificateFile || !certificateId) {
        setError("Please select a file and enter the certificate ID");
        setLoading(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("certificate", certificateFile);
      formData.append("certificateId", certificateId);

      // Call API
      const response = await verifyCertificateByUpload(formData);

      if (response.data.success) {
        // Navigate to result page
        navigate("/verification-result", {
          state: {
            isValid: response.data.isValid,
            result: response.data.data
          }
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyById = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!certificateId) {
        setError("Please enter the certificate ID");
        setLoading(false);
        return;
      }

      // Call API
      const response = await verifyCertificateById({ certificateId });

      if (response.data.success) {
        // Navigate to result page
        navigate("/verification-result", {
          state: {
            isValid: response.data.isValid,
            result: response.data.data
          }
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Verify Certificate</h1>
          </div>
          <p className="text-gray-600">
            Verify the authenticity of your academic certificate using blockchain
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Method Selection */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Choose Verification Method
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setMethod("upload")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                method === "upload"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Upload Certificate
            </button>
            <button
              onClick={() => setMethod("id")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                method === "id"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Enter Certificate ID
            </button>
          </div>
        </div>

        {/* Form Content */}
        {method === "upload" ? (
          <form onSubmit={handleVerifyByUpload} className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Upload Certificate File
            </h3>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Certificate File *
              </label>
              <UploadBox onFileSelect={handleFileSelect} />
            </div>

            {/* Certificate ID */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Certificate ID *
              </label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="CERT-2024-001"
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Enter the certificate ID that appears on your certificate
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyById} className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Verify by Certificate ID
            </h3>

            {/* Certificate ID */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Certificate ID *
              </label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="CERT-2024-001"
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                Enter the certificate ID (usually found at the bottom of the certificate)
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm">
                ℹ️ This method will check if the certificate exists on the blockchain but
                won't verify the file authenticity. Upload the certificate file for
                complete verification.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
