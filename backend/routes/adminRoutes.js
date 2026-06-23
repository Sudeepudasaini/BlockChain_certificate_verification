const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/stats", protect, authorize("admin"), adminController.getDashboardStats);
router.get("/users", protect, authorize("admin"), adminController.getAllUsers);
router.get("/users/:id", protect, authorize("admin"), adminController.getUserById);
router.put("/users/:id", protect, authorize("admin"), adminController.updateUser);
router.patch("/users/:id/status", protect, authorize("admin"), adminController.updateUserStatus);
router.delete("/users/:id", protect, authorize("admin"), adminController.deleteUser);
router.patch('/users/:id/reset-password', protect, authorize('admin'), adminController.resetUserPassword);
router.get("/certificates", protect, authorize("admin"), adminController.getAllCertificates);
router.patch("/certificates/:id/revoke", protect, authorize("admin"), adminController.revokeCertificate);

// Universities
router.get('/universities', protect, authorize('admin'), adminController.getAllUniversities);
router.post('/universities', protect, authorize('admin'), adminController.createUniversity);
router.patch('/universities/:id', protect, authorize('admin'), adminController.updateUniversity);
router.patch('/universities/:id/status', protect, authorize('admin'), adminController.toggleUniversityStatus);
router.patch('/universities/:id/reset-password', protect, authorize('admin'), adminController.resetUniversityPassword);

// Verifiers
router.get('/verifiers', protect, authorize('admin'), adminController.getAllVerifiers);
router.post('/verifiers', protect, authorize('admin'), adminController.createVerifier);
router.patch('/verifiers/:id', protect, authorize('admin'), adminController.updateVerifier);
router.patch('/verifiers/:id/status', protect, authorize('admin'), adminController.toggleVerifierStatus);
router.patch('/verifiers/:id/reset-password', protect, authorize('admin'), adminController.resetVerifierPassword);

module.exports = router;
