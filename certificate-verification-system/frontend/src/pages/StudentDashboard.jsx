// Student Dashboard Page
// Shows all certificates belonging to the logged-in student

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentCertificates } from "../api/api";
import CertificateCard from "../components/CertificateCard";
import { AlertCircle, Award } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getStudentCertificates(user.studentId);
        if (response.data.success) {
          setCertificates(response.data.data);
        }
      } catch (err) {
        setError("Failed to load certificates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.studentId) {
      fetchCertificates();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Award size={32} />
            <h1 className="text-4xl font-bold">My Certificates</h1>
          </div>
          <p className="text-indigo-100">
            Welcome, {user?.name}. Here are your academic certificates.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {certificates && certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <CertificateCard key={cert._id} certificate={cert} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Award className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-gray-600 text-lg mb-4">
              You don't have any certificates yet
            </p>
            <p className="text-gray-500">
              Once your university issues certificates, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
