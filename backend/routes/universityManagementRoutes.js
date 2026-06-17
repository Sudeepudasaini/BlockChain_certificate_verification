const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  toggleUniversityStatus,
  resetUniversityPassword,
} = require("../controllers/universityManagementController");

// All routes protected with admin authorization
router.post("/", protect, authorize("admin"), createUniversity);
router.get("/", protect, authorize("admin"), getAllUniversities);
router.get("/:id", protect, authorize("admin"), getUniversityById);
router.patch("/:id", protect, authorize("admin"), updateUniversity);
router.patch("/:id/status", protect, authorize("admin"), toggleUniversityStatus);
router.patch(
  "/:id/reset-password",
  protect,
  authorize("admin"),
  resetUniversityPassword
);

module.exports = router;
