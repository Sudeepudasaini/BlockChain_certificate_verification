// Express server entry point
// This file initializes the Express server and connects to MongoDB and blockchain

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import configuration
const connectDB = require("./config/db");
const { initializeBlockchain } = require("./config/blockchain");

// Import routes
const authRoutes = require("./routes/authRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running"
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  
  // Handle multer errors
  if (err.name === "MulterError") {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 10MB limit"
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Initialize and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await connectDB();

    // Initialize blockchain connection
    console.log("🔄 Initializing blockchain...");
    await initializeBlockchain();

    // Start listening
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log("📝 API Documentation:");
      console.log("   - POST /api/auth/register - Register user");
      console.log("   - POST /api/auth/login - Login user");
      console.log("   - POST /api/certificates/issue - Issue certificate");
      console.log("   - POST /api/certificates/verify-upload - Verify by upload");
      console.log("   - POST /api/certificates/verify-id - Verify by ID");
      console.log("   - GET /api/certificates/:certificateId - Get certificate");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
