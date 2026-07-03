const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");
const { protect, authorize } = require("../middleware/authMiddleware");

// University self-service routes (university-only)
router.get("/profile", protect, authorize("university"), universityController.getProfile);
router.put("/profile", protect, authorize("university"), universityController.updateProfile);
router.put("/change-password", protect, authorize("university"), universityController.changePassword);

module.exports = router;
