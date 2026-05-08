// Result Card Component - displays verification results
// Shows success or failure of certificate verification

import React from "react";
import { CheckCircle, AlertTriangle, Copy } from "lucide-react";

const ResultCard = ({ result, isValid }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isValid) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
        {/* Success Header */}
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle size={40} className="text-green-500" />
          <div>
            <h2 className="text-2xl font-bold text-green-700">
              Certificate Verified Successfully
            </h2>
            <p className="text-green-600">This certificate is authentic and valid</p>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Student Name</p>
            <p className="font-bold text-gray-800">{result.studentName}</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Student ID</p>
            <p className="font-bold text-gray-800">{result.studentId}</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">University</p>
            <p className="font-bold text-gray-800">{result.universityName}</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Program</p>
            <p className="font-bold text-gray-800">{result.programName}</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Batch Year</p>
            <p className="font-bold text-gray-800">{result.batchYear}</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Issue Date</p>
            <p className="font-bold text-gray-800">
              {new Date(result.issueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="bg-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
              <p className="font-bold text-gray-800 break-all">{result.certificateId}</p>
            </div>
            <button
              onClick={() => copyToClipboard(result.certificateId)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <Copy size={20} />
            </button>
          </div>
          {copied && <p className="text-green-600 text-sm mt-2">Copied!</p>}
        </div>

        {/* QR Code */}
        {result.qrCode && (
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-3 font-semibold">
              Verification QR Code
            </p>
            <img
              src={result.qrCode}
              alt="QR Code"
              className="w-48 h-48 mx-auto border-2 border-indigo-200 rounded"
            />
          </div>
        )}

        {/* Verification Count */}
        <div className="mt-6 bg-indigo-100 border border-indigo-300 rounded-lg p-4 text-center">
          <p className="text-sm text-indigo-700">
            This certificate has been verified{" "}
            <span className="font-bold">{result.verificationCount}</span> times
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8">
        {/* Failure Header */}
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle size={40} className="text-red-500" />
          <div>
            <h2 className="text-2xl font-bold text-red-700">
              Certificate Not Verified
            </h2>
            <p className="text-red-600">
              This certificate does not match blockchain records
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
          <p className="font-bold text-gray-800">{result.certificateId}</p>
        </div>

        {/* Reason */}
        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-2">Why is it invalid?</p>
          <p className="text-red-600">{result.reason || "Unknown reason"}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ If you believe this is a valid certificate, please contact the issuing
            university for verification.
          </p>
        </div>
      </div>
    );
  }
};

export default ResultCard;
