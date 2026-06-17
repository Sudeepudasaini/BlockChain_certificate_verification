import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const path = location.pathname
    if (path.startsWith('/student'))    return <Navigate to="/student/login"    state={{ from: location }} replace />
    if (path.startsWith('/university')) return <Navigate to="/university/login" state={{ from: location }} replace />
    if (path.startsWith('/admin'))      return <Navigate to="/admin/login"      state={{ from: location }} replace />
    if (path.startsWith('/verifier'))   return <Navigate to="/verifier/login"   state={{ from: location }} replace />
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute
