// Certificate Card Component - displays certificate information
// Used in student dashboard and search results

import React from "react";
import { Award, Calendar, Building2, BookOpen } from "lucide-react";

const CertificateCard = ({ certificate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-600">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {certificate.programName}
          </h3>
          <p className="text-indigo-600 font-semibold">
            Certificate ID: {certificate.certificateId}
          </p>
        </div>
        <Award className="text-yellow-500" size={28} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Building2 size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-600">University</p>
            <p className="font-semibold text-gray-800">
              {certificate.universityName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-600">Issued</p>
            <p className="font-semibold text-gray-800">
              {new Date(certificate.issueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <BookOpen size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-600">Batch Year</p>
            <p className="font-semibold text-gray-800">{certificate.batchYear}</p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      {certificate.qrCode && (
        <div className="border-t pt-4">
          <p className="text-xs text-gray-600 mb-2">QR Code for Verification</p>
          <img
            src={certificate.qrCode}
            alt="QR Code"
            className="w-32 h-32 border rounded"
          />
        </div>
      )}

      {/* Verification Count */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Verified <span className="font-bold text-indigo-600">
            {certificate.verificationCount}
          </span> times
        </p>
      </div>
    </div>
  );
};

export default CertificateCard;
