const Certificate = require("../models/Certificate");
const { v4: uuidv4 } = require("uuid");
const { generateSHA256, generateSHA256FromBuffer } = require("../utils/hashUtils");
const {
  storeCertificateOnBlockchain,
  verifyCertificateOnBlockchain,
} = require("../utils/blockchainUtils");
const qrcode = require("qrcode");
const fs = require("fs");
const path = require("path");

const issueCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Certificate file is required" });
    }

    const { studentName, studentId, studentEmail, degree, major, graduationYear } = req.body;

    const certId = `CERT-${uuidv4()}`;
    const sha256Hash = generateSHA256(req.file.path);

    const qrUrl = `http://localhost:5173/verify?id=${certId}`;
    const qrCode = await qrcode.toDataURL(qrUrl);

    const blockchainResult = await storeCertificateOnBlockchain(certId, sha256Hash);

    const certificate = await Certificate.create({
      certId,
      studentName,
      studentId,
      studentEmail,
      degree,
      major,
      universityName: req.user.universityName,
      issuedBy: req.user._id,
      graduationYear,
      sha256Hash,
      blockchainTxHash: blockchainResult.txHash,
      blockchainStored: true,
      filePath: req.file.path,
      qrCode,
    });

    const populatedCert = await certificate.populate("issuedBy", "name email universityName");

    res.status(201).json({ certificate: populatedCert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertificates = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "university") {
      query.issuedBy = req.user._id;
    }

    const certificates = await Certificate.find(query).populate("issuedBy", "name email universityName");
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertificateById = async (req, res) => {
  try {
    const { certId } = req.params;
    const certificate = await Certificate.findOne({ certId }).populate("issuedBy", "name email universityName");

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.status(200).json({ certificate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      $or: [{ studentEmail: req.user.email }, { studentId: req.user.studentId }],
    }).populate("issuedBy", "name email universityName");

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyByUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Certificate file is required" });
    }

    const sha256Hash = generateSHA256(req.file.path);

    fs.unlinkSync(req.file.path);

    const certificate = await Certificate.findOne({ sha256Hash }).populate(
      "issuedBy",
      "name email universityName"
    );

    if (!certificate) {
      return res.status(200).json({ valid: false, blockchainVerified: false });
    }

    if (certificate.isRevoked) {
      return res.status(200).json({
        valid: false,
        blockchainVerified: false,
        certificate,
        reason: "Certificate has been revoked",
      });
    }

    const blockchainVerified = await verifyCertificateOnBlockchain(certificate.certId, sha256Hash);

    res.status(200).json({
      valid: true,
      blockchainVerified,
      certificate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyById = async (req, res) => {
  try {
    const { certId } = req.body;

    const certificate = await Certificate.findOne({ certId }).populate("issuedBy", "name email universityName");

    if (!certificate) {
      return res.status(200).json({ valid: false, blockchainVerified: false });
    }

    if (certificate.isRevoked) {
      return res.status(200).json({
        valid: false,
        blockchainVerified: false,
        certificate,
        reason: "Certificate has been revoked",
      });
    }

    const blockchainVerified = await verifyCertificateOnBlockchain(certificate.certId, certificate.sha256Hash);

    res.status(200).json({
      valid: true,
      blockchainVerified,
      certificate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const downloadCertificate = async (req, res) => {
  try {
    const { certId } = req.params;

    const certificate = await Certificate.findOne({ certId });

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    const filePath = certificate.filePath;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  issueCertificate,
  getCertificates,
  getCertificateById,
  getMyCertificates,
  verifyByUpload,
  verifyById,
  downloadCertificate,
};
