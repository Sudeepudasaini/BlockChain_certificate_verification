// Certificate routes
// Handles certificate issuance, verification, and retrieval

const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  issueCertificate,
  verifyCertificateByUpload,
  verifyCertificateById,
  getCertificateById,
  getStudentCertificates,
  getVerificationHistory,
  getUniversityDashboard
} = require("../controllers/certificateController");

// Public routes
router.post("/verify-upload", upload.single("certificate"), verifyCertificateByUpload);
router.post("/verify-id", verifyCertificateById);
router.get("/:certificateId", getCertificateById);
router.get("/history/all", getVerificationHistory);

// Protected routes - University only
router.post(
  "/issue",
  protect,
  authorize("university"),
  upload.single("certificate"),
  issueCertificate
);

router.get(
  "/dashboard/university",
  protect,
  authorize("university"),
  getUniversityDashboard
);

// Protected routes - Student
router.get(
  "/student/:studentId",
  protect,
  authorize("student"),
  getStudentCertificates
);

module.exports = router;
