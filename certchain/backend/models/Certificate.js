const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    certId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      trim: true,
    },
    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    studentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    universityName: {
      type: String,
      required: true,
      trim: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    graduationYear: {
      type: String,
      trim: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    sha256Hash: {
      type: String,
      required: true,
      trim: true,
    },
    blockchainTxHash: {
      type: String,
      trim: true,
    },
    blockchainStored: {
      type: Boolean,
      default: false,
    },
    originalFilePath: {
      type: String,
      trim: true,
    },
    certificateFilePath: {
      type: String,
      trim: true,
    },
    qrCode: {
      type: String,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
