const User = require("../models/User");
const UniversityProfile = require("../models/UniversityProfile");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      universityName,
      studentId,
      website,
      address,
      description,
    } = req.body;

    const normalizedEmail = email?.toLowerCase().trim();

    if (!name || !normalizedEmail || !password || !role) {
      return res.status(400).json({ error: "Name, email, password and role are required" });
    }

    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role,
      universityName: role === "university" ? universityName || name : undefined,
      studentId: role === "student" ? studentId : undefined,
    });

    if (role === "university") {
      await UniversityProfile.create({
        user: user._id,
        universityName: universityName || name,
        website,
        address,
        description,
        contactEmail: normalizedEmail,
      });
    }

    const token = generateToken(user._id);
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      universityName: user.universityName,
      studentId: user.studentId,
    };

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "User account is inactive" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      universityName: user.universityName,
      studentId: user.studentId,
    };

    res.status(200).json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  generateToken,
};
