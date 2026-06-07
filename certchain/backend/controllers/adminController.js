const User = require("../models/User");
const Certificate = require("../models/Certificate");

const getDashboardStats = async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const totalUsers = await User.countDocuments();
    const certificatesToday = await Certificate.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });
    const blockchainStored = await Certificate.countDocuments({ blockchainStored: true });

    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalCertificates,
      totalUsers,
      certificatesToday,
      blockchainStored,
      usersByRole,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isActive = !user.isActive;
    user = await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    Object.keys(updates).forEach((key) => {
      if (key !== 'email' || updates.email) {
        user[key] = updates[key]
      }
    });

    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate("issuedBy", "name email universityName");
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const revokeCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findByIdAndUpdate(id, { isRevoked: true }, { new: true });

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.status(200).json({ certificate, message: "Certificate revoked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus,
  getAllCertificates,
  revokeCertificate,
};
