import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import VerifyPage from './pages/VerifyPage'
import VerifyResultPage from './pages/VerifyResultPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import UniversityDashboard from './pages/university/UniversityDashboard'
import IssueCertificate from './pages/university/IssueCertificate'
import StudentDashboard from './pages/student/StudentDashboard'
import VerifierDashboard from './pages/verifier/VerifierDashboard'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
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

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
