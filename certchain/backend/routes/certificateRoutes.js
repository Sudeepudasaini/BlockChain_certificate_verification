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
router.put(
  "/:certId",
  protect,
  authorize("university", "admin"),
  upload.single("certificate"),
  certificateController.updateCertificate
);
router.get("/", protect, authorize("university", "admin"), certificateController.getCertificates);
router.get("/my", protect, authorize("student"), certificateController.getMyCertificates);
router.get("/:certId/download", protect, certificateController.downloadCertificate);
router.get("/:certId", certificateController.getCertificateById);
router.post("/verify-upload", upload.single("certificate"), certificateController.verifyByUpload);
router.post("/verify-id", certificateController.verifyById);

module.exports = router;
