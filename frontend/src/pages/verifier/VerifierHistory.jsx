import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'

const VerifierHistory = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('verifyHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="flex">
      <Sidebar role="verifier" />
      <div className="ml-60 flex-1 p-8">
        <div className="card-base p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-4">Verification History</h1>
          {history.length === 0 ? (
            <p className="text-gray-600">Your recent certificate verifications will appear here.</p>
          ) : (
            <div className="grid gap-4">
              {history.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl border ${item.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <p className="text-sm font-semibold text-blue-dark">{item.id}</p>
                  <p className="text-sm text-gray-600">{new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-sm mt-2">Result: {item.valid ? 'Valid' : 'Invalid'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifierHistory
