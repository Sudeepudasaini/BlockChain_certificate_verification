const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/issue",
  protect,
  authorize("university"),
  upload.single("certificate"),
  certificateController.issueCertificate
);
router.get("/", protect, authorize("university", "admin"), certificateController.getCertificates);
router.get("/my", protect, authorize("student"), certificateController.getMyCertificates);
router.get("/:certId", certificateController.getCertificateById);
router.get("/:certId/download", protect, certificateController.downloadCertificate);
router.post("/verify-upload", upload.single("certificate"), certificateController.verifyByUpload);
router.post("/verify-id", certificateController.verifyById);
// Update and delete by database id
router.put('/:id', protect, authorize('university','admin'), certificateController.updateCertificate);
router.delete('/:id', protect, authorize('university','admin'), certificateController.deleteCertificate);

module.exports = router;
