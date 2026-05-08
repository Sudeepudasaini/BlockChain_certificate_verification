// API client for making HTTP requests to backend
// All API calls should go through this file

import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to all requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getCurrentUser = () => API.get("/auth/me");

// Certificate APIs
export const issueCertificate = (formData) => {
  return API.post("/certificates/issue", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const verifyCertificateByUpload = (formData) => {
  return API.post("/certificates/verify-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const verifyCertificateById = (data) => {
  return API.post("/certificates/verify-id", data);
};

export const getCertificateById = (certificateId) => {
  return API.get(`/certificates/${certificateId}`);
};

export const getStudentCertificates = (studentId) => {
  return API.get(`/certificates/student/${studentId}`);
};

export const getVerificationHistory = () => {
  return API.get("/certificates/history/all");
};

export const getUniversityDashboard = () => {
  return API.get("/certificates/dashboard/university");
};

export default API;
