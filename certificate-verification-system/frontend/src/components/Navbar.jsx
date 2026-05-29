// Navbar component - displayed on all pages
// Shows navigation menu and user information

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Home } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-indigo-200">
          <Home size={24} />
          Certificate Verify
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-indigo-100">
                {user.name} ({user.role})
              </span>

              {user.role === "university" && (
                <>
                  <Link
                    to="/university-dashboard"
                    className="hover:bg-indigo-700 px-3 py-2 rounded"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/issue-certificate"
                    className="hover:bg-indigo-700 px-3 py-2 rounded"
                  >
                    Issue Certificate
                  </Link>
                </>
              )}

              {user.role === "student" && (
                <Link
                  to="/student-dashboard"
                  className="hover:bg-indigo-700 px-3 py-2 rounded"
                >
                  My Certificates
                </Link>
              )}

              <Link
                to="/verify-certificate"
                className="hover:bg-indigo-700 px-3 py-2 rounded"
              >
                Verify
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-indigo-700 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-indigo-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
