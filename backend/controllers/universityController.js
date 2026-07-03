const User = require("../models/User");
const bcryptjs = require("bcryptjs");

// @desc Get logged-in university's own profile
// @route GET /api/university/profile
// @access University only
const getProfile = async (req, res) => {
  try {
    const universityId = req.user.id;

    const university = await User.findOne({
      _id: universityId,
      role: "university",
    }).select("-password");

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update university's own profile (name, phone, address only)
// @route PUT /api/university/profile
// @access University only
const updateProfile = async (req, res) => {
  try {
    const universityId = req.user.id;
    const { name, phone, address } = req.body;

    // Validate name is not empty
    if (name !== undefined && (!name || typeof name !== "string" || !name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    // Validate phone if provided: must be exactly 10 digits
    if (phone !== undefined && phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    const university = await User.findOne({
      _id: universityId,
      role: "university",
    });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    // Only allow updating name, phone, address
    if (name !== undefined) {
      university.name = name.trim();
      university.universityName = name.trim();
    }
    if (phone !== undefined) {
      university.phone = phone || "";
    }
    if (address !== undefined) {
      university.address = address || "";
    }

    await university.save();

    // Return without password
    const updatedUniversity = university.toObject();
    delete updatedUniversity.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      university: updatedUniversity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Change university's password
// @route PUT /api/university/change-password
// @access University only
const changePassword = async (req, res) => {
  try {
    const universityId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Validate new password length
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    // Find university (with password for verification)
    const university = await User.findOne({
      _id: universityId,
      role: "university",
    });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    // Verify current password
    const isPasswordMatch = await university.matchPassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash and save new password
    university.password = newPassword;
    await university.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
