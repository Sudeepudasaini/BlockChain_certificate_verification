// Certificate model for storing certificate details in MongoDB
// Stores metadata about certificates (not the blockchain hash)

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    // Unique certificate ID
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Student full name
    studentName: {
      type: String,
      required: true,
      trim: true
    },

    // Student email
    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    // Student ID
    studentId: {
      type: String,
      required: true,
      trim: true
    },

    // University name that issued the certificate
    universityName: {
      type: String,
      required: true,
      trim: true
    },

    // Program/Course name
    programName: {
      type: String,
      required: true,
      trim: true
    },

    // Batch/Year of completion
    batchYear: {
      type: String,
      required: true
    },

    // Certificate issue date
    issueDate: {
      type: Date,
      required: true
    },

    // SHA-256 hash of the certificate file
    certificateHash: {
      type: String,
      required: true
    },

    // Path to uploaded certificate file
    filePath: {
      type: String,
      required: true
    },

    // Blockchain transaction hash (after issuing on blockchain)
    blockchainTxHash: {
      type: String,
      default: null
    },

    // Is certificate issued on blockchain
    issuedOnBlockchain: {
      type: Boolean,
      default: false
    },

    // QR code data (stored as base64)
    qrCode: {
      type: String,
      default: null
    },

    // University/Admin who issued this certificate
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Verification count
    verificationCount: {
      type: Number,
      default: 0
    },

    // Status: 'pending', 'issued', 'revoked'
    status: {
      type: String,
      enum: ["pending", "issued", "revoked"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
