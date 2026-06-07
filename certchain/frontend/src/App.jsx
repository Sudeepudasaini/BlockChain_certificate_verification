import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyPage from './pages/VerifyPage'
import VerifyResultPage from './pages/VerifyResultPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCertificates from './pages/admin/AdminCertificates'
import AdminSettings from './pages/admin/AdminSettings'
import UniversityDashboard from './pages/university/UniversityDashboard'
import IssueCertificate from './pages/university/IssueCertificate'
import UniversityCertificates from './pages/university/UniversityCertificates'
import UniversitySettings from './pages/university/UniversitySettings'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentDownloads from './pages/student/StudentDownloads'
import StudentProfile from './pages/student/StudentProfile'
import VerifierDashboard from './pages/verifier/VerifierDashboard'
import VerifierHistory from './pages/verifier/VerifierHistory'
import VerifierProfile from './pages/verifier/VerifierProfile'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/verify/result" element={<VerifyResultPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCertificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* University Routes */}
        <Route
          path="/university/dashboard"
          element={
            <ProtectedRoute allowedRoles={['university']}>
              <UniversityDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/issue"
          element={
            <ProtectedRoute allowedRoles={['university']}>
              <IssueCertificate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/certificates"
          element={
            <ProtectedRoute allowedRoles={['university']}>
              <UniversityCertificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/settings"
          element={
            <ProtectedRoute allowedRoles={['university']}>
              <UniversitySettings />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/downloads"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDownloads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Verifier Routes */}
        <Route
          path="/verifier/dashboard"
          element={
            <ProtectedRoute allowedRoles={['verifier']}>
              <VerifierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifier/history"
          element={
            <ProtectedRoute allowedRoles={['verifier']}>
              <VerifierHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifier/profile"
          element={
            <ProtectedRoute allowedRoles={['verifier']}>
              <VerifierProfile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
