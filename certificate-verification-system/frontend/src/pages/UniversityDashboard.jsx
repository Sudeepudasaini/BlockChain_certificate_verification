// University Dashboard Page
// Shows statistics and recent certificates issued by the university

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUniversityDashboard } from "../api/api";
import DashboardStats from "../components/DashboardStats";
import CertificateCard from "../components/CertificateCard";
import { AlertCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const UniversityDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getUniversityDashboard();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">{stats?.universityName}</h1>
          <p className="text-indigo-100 mt-2">Dashboard</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>
          <DashboardStats stats={stats} />
        </div>

        {/* Issue Certificate Button */}
        <div className="mb-12">
          <Link
            to="/issue-certificate"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
          >
            <Plus size={20} />
            Issue New Certificate
          </Link>
        </div>

        {/* Recent Certificates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Certificates
          </h2>

          {stats?.recentCertificates && stats.recentCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.recentCertificates.map((cert) => (
                <CertificateCard key={cert._id} certificate={cert} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">No certificates issued yet</p>
              <Link
                to="/issue-certificate"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Issue your first certificate
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
