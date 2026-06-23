const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Create a new university
// @route POST /api/admin/universities
// @access Admin only
const createUniversity = async (req, res) => {
  try {
    const { name, universityCode, email, password, phone, address, status } =
      req.body;

    // Validate required fields
    if (!name || !universityCode || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, universityCode, email, and password are required",
      });
    }

    // Validate phone if provided: must be exactly 10 digits
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
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

    // Create university user
    const university = new User({
      name,
      email,
      password: hashedPassword,
      role: "university",
      universityName: name,
      universityCode,
      phone: phone || "",
      address: address || "",
      isActive: status === "active",
    });

    await university.save();

    // Return without password
    const universityData = university.toObject();
    delete universityData.password;

    res.status(201).json({
      success: true,
      message: "University created successfully",
      university: universityData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get all universities
// @route GET /api/admin/universities
// @access Admin only
const getAllUniversities = async (req, res) => {
  try {
    const universities = await User.find({ role: "university" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      universities,
      count: universities.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get university by ID
// @route GET /api/admin/universities/:id
// @access Admin only
const getUniversityById = async (req, res) => {
  try {
    const university = await User.findOne({
      _id: req.params.id,
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

// @desc Update university
// @route PATCH /api/admin/universities/:id
// @access Admin only
const updateUniversity = async (req, res) => {
  try {
    const { name, universityCode, phone, address, status } = req.body;

    // Only allow specific fields to be updated
    const allowedFields = {};
    if (name) allowedFields.name = name;
    if (universityCode) allowedFields.universityCode = universityCode;
    if (phone) {
      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
      }
      allowedFields.phone = phone;
    }
    if (address) allowedFields.address = address;
    if (status) {
      allowedFields.isActive = status === "active";
    }

    const university = await User.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      { new: true, runValidators: true }
    ).select("-password");

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

// @desc Toggle university status
// @route PATCH /api/admin/universities/:id/status
// @access Admin only
const toggleUniversityStatus = async (req, res) => {
  try {
    const university = await User.findOne({
      _id: req.params.id,
      role: "university",
    });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    // Toggle status
    university.isActive = !university.isActive;
    await university.save();

    res.status(200).json({
      success: true,
      message: `University status changed to ${
        university.isActive ? "active" : "disabled"
      }`,
      university: university.toObject({ transform: true }),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Reset university password
// @route PATCH /api/admin/universities/:id/reset-password
// @access Admin only
const resetUniversityPassword = async (req, res) => {
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
    const university = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  toggleUniversityStatus,
  resetUniversityPassword,
};
