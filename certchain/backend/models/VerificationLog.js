const mongoose = require("mongoose");

const VerificationLogSchema = new mongoose.Schema(
  {
    certId: {
      type: String,
      trim: true,
      index: true,
    },
    method: {
      type: String,
      enum: ["upload", "id", "qr", "api"],
      default: "api",
    },
    userEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    blockchainVerified: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    details: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationLog", VerificationLogSchema);
