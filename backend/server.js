require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const startServer = async () => {
  await connectDB();
};

startServer();

const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:5173', 'http://localhost:5174'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/admin", adminRoutes);
// Note: specific university/verifier routes are provided by adminRoutes.
// Removed references to non-existent route files to avoid startup errors.
app.use('/api/career', require('./routes/careerRoutes'))

app.use((err, req, res, next) => {
  console.error('Error handler:', { message: err.message, stack: err.stack, path: req.path, method: req.method, body: req.body });
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
