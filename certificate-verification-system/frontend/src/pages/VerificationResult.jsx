// Verification Result Page
// Displays the result of certificate verification

import React from "react";
import { useLocation, Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import { Home } from "lucide-react";

const VerificationResult = () => {
  const location = useLocation();
  const state = location.state;

  // Handle case where user navigates directly without verification
  if (!state || !state.result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-700 font-semibold mb-4">
            Please verify a certificate first
          </p>
          <Link
            to="/verify-certificate"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Go to verification page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Result Card */}
        <ResultCard result={state.result} isValid={state.isValid} />

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            to="/verify-certificate"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
          >
            Verify Another Certificate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;
