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

// --- University Management ---
const getAllUniversities = async (req, res) => {
  try {
    const universities = await User.find({ role: 'university' }).select('-password');
    res.status(200).json({ universities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createUniversity = async (req, res) => {
  try {
    const { name, universityCode, email, password, phone, address, status } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
    console.log('createUniversity called with body:', { name, universityCode, email, phone, address, status });
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: 'university',
      universityCode,
      phone,
      address,
      isActive: status !== 'disabled'
    });

    console.log('createUniversity created user id:', user._id.toString());

    const userObj = user.toObject(); delete userObj.password;
    res.status(201).json({ university: userObj });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'Duplicate field error' });
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    console.error('createUniversity error', error);
    res.status(500).json({ error: error.message });
  }
}

const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findOne({ _id: id, role: 'university' });
    if (!user) return res.status(404).json({ error: 'University not found' });

    ['name','universityCode','phone','address','isActive'].forEach(k => {
      if (Object.prototype.hasOwnProperty.call(updates, k)) user[k] = updates[k];
    });

    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ university: userObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const toggleUniversityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, role: 'university' });
    if (!user) return res.status(404).json({ error: 'University not found' });
    user.isActive = !user.isActive;
    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ university: userObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const resetUniversityPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: 'New password required' });
    const user = await User.findOne({ _id: id, role: 'university' });
    if (!user) return res.status(404).json({ error: 'University not found' });
    user.password = newPassword;
    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ university: userObj });
  } catch (error) {
    console.error('resetUniversityPassword error', error);
    res.status(500).json({ error: error.message });
  }
}

// --- Verifier Management ---
const getAllVerifiers = async (req, res) => {
  try {
    const verifiers = await User.find({ role: 'verifier' }).select('-password');
    res.status(200).json({ verifiers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createVerifier = async (req, res) => {
  try {
    const { name, email, organization, phone, password, status } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ error: 'User already exists' });
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: 'verifier',
      organization,
      phone,
      isActive: status !== 'disabled'
    });
    const userObj = user.toObject(); delete userObj.password;
    res.status(201).json({ verifier: userObj });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'Duplicate field error' });
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    console.error('createVerifier error', error);
    res.status(500).json({ error: error.message });
  }
}

const updateVerifier = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findOne({ _id: id, role: 'verifier' });
    if (!user) return res.status(404).json({ error: 'Verifier not found' });
    ['name','organization','phone','isActive'].forEach(k => {
      if (Object.prototype.hasOwnProperty.call(updates, k)) user[k] = updates[k];
    });
    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ verifier: userObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const toggleVerifierStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, role: 'verifier' });
    if (!user) return res.status(404).json({ error: 'Verifier not found' });
    user.isActive = !user.isActive;
    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ verifier: userObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const resetVerifierPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: 'New password required' });
    const user = await User.findOne({ _id: id, role: 'verifier' });
    if (!user) return res.status(404).json({ error: 'Verifier not found' });
    user.password = newPassword;
    await user.save();
    const userObj = user.toObject(); delete userObj.password;
    res.status(200).json({ verifier: userObj });
  } catch (error) {
    console.error('resetVerifierPassword error', error);
    res.status(500).json({ error: error.message });
  }
}

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

module.exports = Object.assign({}, module.exports, {
  getAllUniversities,
  createUniversity,
  updateUniversity,
  toggleUniversityStatus,
  resetUniversityPassword,
  getAllVerifiers,
  createVerifier,
  updateVerifier,
  toggleVerifierStatus,
  resetVerifierPassword,
});
