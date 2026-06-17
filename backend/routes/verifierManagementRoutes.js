const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createVerifier,
  getAllVerifiers,
  getVerifierById,
  updateVerifier,
  toggleVerifierStatus,
  resetVerifierPassword,
} = require("../controllers/verifierManagementController");

// All routes protected with admin authorization
router.post("/", protect, authorize("admin"), createVerifier);
router.get("/", protect, authorize("admin"), getAllVerifiers);
router.get("/:id", protect, authorize("admin"), getVerifierById);
router.patch("/:id", protect, authorize("admin"), updateVerifier);
router.patch("/:id/status", protect, authorize("admin"), toggleVerifierStatus);
router.patch(
  "/:id/reset-password",
  protect,
  authorize("admin"),
  resetVerifierPassword
);

module.exports = router;
