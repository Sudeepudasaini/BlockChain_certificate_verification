// Home Page - Landing page for the application
// Shows introduction and system features

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Shield,
  CheckCircle,
  Upload,
  Search,
  Lock,
  Award
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Secure Academic Certificate Verification
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Verify the authenticity of academic certificates using blockchain technology.
            Say goodbye to fake certificates and hello to transparent verification.
          </p>

          <div className="flex gap-4 justify-center">
            {user ? (
              <>
                {user.role === "university" && (
                  <Link
                    to="/issue-certificate"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-100"
                  >
                    Issue Certificate
                  </Link>
                )}
                <Link
                  to="/verify-certificate"
                  className="bg-indigo-400 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-500"
                >
                  Verify Certificate
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/verify-certificate"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-100"
                >
                  Verify Certificate
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-400 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Step 1: Upload Certificate
              </h3>
              <p className="text-gray-600">
                University uploads the certificate file and certificate details to the
                system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Step 2: Secure Hash on Blockchain
              </h3>
              <p className="text-gray-600">
                SHA-256 hash of the certificate is stored securely on the blockchain
                smart contract.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Step 3: Verify Instantly
              </h3>
              <p className="text-gray-600">
                Anyone can verify the certificate by comparing the file hash with the
                blockchain record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <Shield className="text-indigo-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Blockchain Security
                </h3>
                <p className="text-gray-600">
                  Immutable records stored on Hardhat local blockchain ensure
                  certificates cannot be altered.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <CheckCircle className="text-green-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Instant Verification
                </h3>
                <p className="text-gray-600">
                  Verify certificates in seconds by uploading the file or entering the
                  certificate ID.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <Award className="text-blue-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  QR Code Support
                </h3>
                <p className="text-gray-600">
                  Scan QR codes on certificates for quick verification from anywhere.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <Lock className="text-purple-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Zero Cost Solution
                </h3>
                <p className="text-gray-600">
                  Uses free, open-source tools and local blockchain. No cryptocurrency
                  fees required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Register as a university, student, or verifier to begin
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-100 inline-block"
            >
              Register Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
