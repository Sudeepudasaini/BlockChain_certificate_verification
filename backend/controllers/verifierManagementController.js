const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Create a new verifier
// @route POST /api/admin/verifiers
// @access Admin only
const createVerifier = async (req, res) => {
  try {
    const { name, email, password, organization, phone, status } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verifier user
    const verifier = new User({
      name,
      email,
      password: hashedPassword,
      role: "verifier",
      organization: organization || "",
      phone: phone || "",
      isActive: status === "active",
    });

    await verifier.save();

    // Return without password
    const verifierData = verifier.toObject();
    delete verifierData.password;

    res.status(201).json({
      success: true,
      message: "Verifier created successfully",
      verifier: verifierData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get all verifiers
// @route GET /api/admin/verifiers
// @access Admin only
const getAllVerifiers = async (req, res) => {
  try {
    const verifiers = await User.find({ role: "verifier" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      verifiers,
      count: verifiers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get verifier by ID
// @route GET /api/admin/verifiers/:id
// @access Admin only
const getVerifierById = async (req, res) => {
  try {
    const verifier = await User.findOne({
      _id: req.params.id,
      role: "verifier",
    }).select("-password");

    if (!verifier) {
      return res.status(404).json({
        success: false,
        message: "Verifier not found",
      });
    }

    res.status(200).json({
      success: true,
      verifier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update verifier
// @route PATCH /api/admin/verifiers/:id
// @access Admin only
const updateVerifier = async (req, res) => {
  try {
    const { name, organization, phone, status } = req.body;

    // Only allow specific fields to be updated
    const allowedFields = {};
    if (name) allowedFields.name = name;
    if (organization) allowedFields.organization = organization;
    if (phone) allowedFields.phone = phone;
    if (status) {
      allowedFields.isActive = status === "active";
    }

    const verifier = await User.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!verifier) {
      return res.status(404).json({
        success: false,
        message: "Verifier not found",
      });
    }

    res.status(200).json({
      success: true,
      verifier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Toggle verifier status
// @route PATCH /api/admin/verifiers/:id/status
// @access Admin only
const toggleVerifierStatus = async (req, res) => {
  try {
    const verifier = await User.findOne({
      _id: req.params.id,
      role: "verifier",
    });

    if (!verifier) {
      return res.status(404).json({
        success: false,
        message: "Verifier not found",
      });
    }

    // Toggle status
    verifier.isActive = !verifier.isActive;
    await verifier.save();

    res.status(200).json({
      success: true,
      message: `Verifier status changed to ${
        verifier.isActive ? "active" : "disabled"
      }`,
      verifier: verifier.toObject({ transform: true }),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Reset verifier password
// @route PATCH /api/admin/verifiers/:id/reset-password
// @access Admin only
const resetVerifierPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Validate new password
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    const verifier = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!verifier) {
      return res.status(404).json({
        success: false,
        message: "Verifier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      verifier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVerifier,
  getAllVerifiers,
  getVerifierById,
  updateVerifier,
  toggleVerifierStatus,
  resetVerifierPassword,
};
