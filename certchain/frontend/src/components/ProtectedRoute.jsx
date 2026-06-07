import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    toast.error('You do not have permission to access this page')
    const routeMap = {
      admin: '/admin/dashboard',
      university: '/university/dashboard',
      student: '/student/dashboard',
      verifier: '/verifier/dashboard',
    }
    return <Navigate to={routeMap[user?.role] || '/'} />
  }

  return children
}

export default ProtectedRoute
