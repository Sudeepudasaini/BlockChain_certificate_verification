import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const VerifyResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result

  if (!result) {
    return (
      <div className="min-h-screen pt-20">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <button
            onClick={() => navigate('/verify')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold"
          >
            Back to Verify
          </button>
        </div>
      </div>
    )
  }

  const isValid = result.valid

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {isValid ? (
            // Valid Certificate
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✓</span>
              </div>

              <h1 className="text-4xl font-bold text-green-600 mb-2">Certificate Verified Successfully</h1>
              <p className="text-gray-600 mb-8">This certificate is authentic and stored on the blockchain</p>

              {/* Certificate Details */}
              <div className="card-base p-8 mb-8">
                <div className="grid grid-cols-2 gap-6 text-left mb-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">STUDENT NAME</p>
                    <p className="text-lg font-bold">{result.certificate?.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">DEGREE</p>
                    <p className="text-lg font-bold">{result.certificate?.degree}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">UNIVERSITY</p>
                    <p className="text-lg font-bold">{result.certificate?.universityName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">ISSUE DATE</p>
                    <p className="text-lg font-bold">
                      {new Date(result.certificate?.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-xs font-semibold text-gray-600 mb-3">CERTIFICATE ID</p>
                  <p className="font-mono text-sm bg-gray-50 p-3 rounded-lg break-all">
                    {result.certificate?.certId}
                  </p>
                </div>

                <div className="border-t mt-6 pt-6">
                  <p className="text-xs font-semibold text-gray-600 mb-3">SHA-256 HASH</p>
                  <p className="font-mono text-sm bg-gray-50 p-3 rounded-lg break-all">
                    {result.certificate?.sha256Hash}
                  </p>
                </div>

                {result.blockchainVerified && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <span className="text-2xl">⛓️</span>
                    <p className="text-green-700 font-semibold">Verified on Blockchain</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/verify')}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all"
                >
                  Verify Another
                </button>
                <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all">
                  Download Certificate
                </button>
              </div>
            </div>
          ) : (
            // Invalid Certificate
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✕</span>
              </div>

              <h1 className="text-4xl font-bold text-red-600 mb-2">Certificate Invalid</h1>
              <p className="text-gray-600 mb-8">This certificate could not be verified</p>

              <div className="card-base p-8 mb-8 border-2 border-red-200 bg-red-50">
                <p className="text-red-700 font-semibold mb-4">⚠️ Verification Failed</p>
                <p className="text-gray-700 mb-4">Possible reasons:</p>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Certificate file has been modified</li>
                  <li>• Certificate ID not found in database</li>
                  <li>• Certificate was issued outside this system</li>
                  <li>• Certificate has been revoked</li>
                </ul>

                {result.certificate?.isRevoked && (
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-700 font-semibold">This certificate has been revoked</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/verify')}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyResultPage
