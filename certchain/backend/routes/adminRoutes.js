const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/stats", protect, authorize("admin"), adminController.getDashboardStats);
router.get("/users", protect, authorize("admin"), adminController.getAllUsers);
router.patch("/users/:id/status", protect, authorize("admin"), adminController.updateUserStatus);
router.get("/certificates", protect, authorize("admin"), adminController.getAllCertificates);
router.patch("/certificates/:id/revoke", protect, authorize("admin"), adminController.revokeCertificate);

module.exports = router;
