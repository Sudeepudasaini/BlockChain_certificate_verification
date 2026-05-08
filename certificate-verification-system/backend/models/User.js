// User model for authentication (Student, University, Admin, Verifier)
// This model stores user information in MongoDB

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // User's email address (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Hashed password
    password: {
      type: String,
      required: true
    },

    // User's role: 'admin', 'university', 'student', 'verifier'
    role: {
      type: String,
      enum: ["admin", "university", "student", "verifier"],
      required: true
    },

    // University name (required for university role)
    universityName: {
      type: String,
      default: null
    },

    // Student ID (required for student role)
    studentId: {
      type: String,
      default: null,
      unique: true,
      sparse: true
    },

    // Flag to check if user is verified
    isVerified: {
      type: Boolean,
      default: false
    },

    // Flag to check if user is active
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcryptjs.genSalt(10);
    // Hash the password
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
