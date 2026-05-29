// Main App component with routing
// Sets up all routes and layout

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UniversityDashboard from "./pages/UniversityDashboard";
import IssueCertificate from "./pages/IssueCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import VerificationResult from "./pages/VerificationResult";
import StudentDashboard from "./pages/StudentDashboard";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
              <Route path="/verification-result" element={<VerificationResult />} />

              {/* Protected Routes - University */}
              <Route
                path="/university-dashboard"
                element={
                  <ProtectedRoute requiredRole="university">
                    <UniversityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/issue-certificate"
                element={
                  <ProtectedRoute requiredRole="university">
                    <IssueCertificate />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Student */}
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p>
                &copy; 2024 Blockchain-Based Secure Academic Certificate Verification
                System
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Powered by Hardhat Local Blockchain, MongoDB, and React
              </p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
