// Authentication routes
// POST /api/auth/register - Register new user
// POST /api/auth/login - Login user
// GET /api/auth/me - Get current user

const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getCurrentUser);

module.exports = router;
