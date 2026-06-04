import React from 'react'

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" aria-hidden="true"></div>
      <p className="text-gray-600 font-medium text-sm">{text}</p>
    </div>
  )
}

export default LoadingSpinner
