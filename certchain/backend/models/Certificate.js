const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    certId: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
    },
    degree: {
      type: String,
      required: true,
    },
    major: {
      type: String,
    },
    universityName: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    graduationYear: {
      type: String,
      required: true,
    },
    sha256Hash: {
      type: String,
      required: true,
    },
    blockchainTxHash: {
      type: String,
    },
    blockchainStored: {
      type: Boolean,
      default: false,
    },
    filePath: {
      type: String,
    },
    qrCode: {
      type: String,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
