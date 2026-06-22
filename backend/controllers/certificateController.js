const fs = require("fs");
const path = require("path");
const Certificate = require("../models/Certificate");
const User = require("../models/User");
const VerificationLog = require("../models/VerificationLog");
const { v4: uuidv4 } = require("uuid");
const qrcode = require("qrcode");
const { generateSHA256 } = require("../utils/hashUtils");
const { generateCertificatePdf } = require("../utils/pdfUtils");
const { storeCertificateOnBlockchain, verifyCertificateOnBlockchain } = require("../utils/blockchainUtils");
const { sendCertificateEmail } = require("../utils/emailUtils");

const issueCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Certificate template or file is required" });
    }

    const {
      studentName,
      studentId,
      studentEmail,
      degree,
      major,
      graduationYear,
      issueDate,
      institution,
      description,
    } = req.body;

    if (!studentName || !studentEmail || !degree || !graduationYear) {
      return res.status(400).json({ error: "Student name, email, degree, and graduation year are required" });
    }

    const certId = `CERT-${uuidv4()}`;
    const formattedIssueDate = issueDate ? new Date(issueDate) : new Date();
    // ensure we have the issuer info (req.user may be a minimal object)
    const issuer = await User.findById(req.user.id || req.user._id).select("name email universityName");
    const universityName = issuer?.universityName || institution || issuer?.name || req.user.name;
    const qrUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?id=${certId}`;
    const qrCode = await qrcode.toDataURL(qrUrl);

    const newCertificateData = {
      certId,
      studentName,
      studentId: studentId || "",
      studentEmail: studentEmail.toLowerCase().trim(),
      degree,
      major,
      universityName,
      issuedBy: issuer ? issuer._id : req.user.id,
      issueDate: formattedIssueDate,
      graduationYear,
      metadata: {
        institution,
        description,
      },
      originalFilePath: req.file.path,
      qrCode,
    };

    const certificateFilePath = await generateCertificatePdf({ certificate: newCertificateData, qrUrl });
    const sha256Hash = generateSHA256(certificateFilePath);

    const blockchainResult = await storeCertificateOnBlockchain(certId, sha256Hash);

    const studentUser = await User.findOne({ email: newCertificateData.studentEmail });

    const certificate = await Certificate.create({
      ...newCertificateData,
      studentUser: studentUser?._id,
      sha256Hash,
      blockchainTxHash: blockchainResult.txHash,
      blockchainStored: true,
      certificateFilePath,
    });

    const populatedCert = await certificate.populate("issuedBy", "name email universityName");

    if (newCertificateData.studentEmail) {
      try {
        const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?id=${certId}`;
        const html = `
          <p>Hello ${studentName},</p>
          <p>Your academic certificate has been issued successfully.</p>
          <p><strong>Certificate ID:</strong> ${certId}</p>
          <p><strong>Verification Link:</strong> <a href="${verificationLink}">${verificationLink}</a></p>
          <p>Thank you for using CertChain.</p>
        `;

        await sendCertificateEmail({
          to: newCertificateData.studentEmail,
          subject: "Academic Certificate Issued",
          html,
          attachments: [
            {
              filename: `${certId}.pdf`,
              path: certificateFilePath,
            },
          ],
        });
      } catch (emailError) {
        console.error("Failed to send certificate email:", emailError);
      }
    }

    res.status(201).json({ certificate: populatedCert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertificates = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "university") {
      const issuer = await User.findById(req.user.id).select("_id");
      query = { issuedBy: issuer ? issuer._id : req.user.id };
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
      $or: [{ studentEmail: req.user.email }, { studentUser: req.user.id }],
    }).populate("issuedBy", "name email universityName");
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logVerification = async ({ certId, method, userEmail, valid, blockchainVerified, ipAddress, details = {} }) => {
  try {
    await VerificationLog.create({
      certId,
      method,
      userEmail,
      valid,
      blockchainVerified,
      ipAddress,
      details,
    });
  } catch (err) {
    console.error("Error logging verification event:", err);
  }
};

const verifyByUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Certificate file is required" });
    }

    const sha256Hash = generateSHA256(req.file.path);
    fs.unlinkSync(req.file.path);

    const certificate = await Certificate.findOne({ sha256Hash }).populate("issuedBy", "name email universityName");

    if (!certificate) {
      await logVerification({
        certId: null,
        method: "upload",
        userEmail: null,
        valid: false,
        blockchainVerified: false,
        ipAddress: req.ip,
        details: { reason: "Certificate not found" },
      });
      return res.status(200).json({ valid: false, blockchainVerified: false });
    }

    if (certificate.isRevoked) {
      await logVerification({
        certId: certificate.certId,
        method: "upload",
        userEmail: certificate.studentEmail,
        valid: false,
        blockchainVerified: false,
        ipAddress: req.ip,
        details: { reason: "Revoked certificate" },
      });
      return res.status(200).json({
        valid: false,
        blockchainVerified: false,
        certificate,
        reason: "Certificate has been revoked",
      });
    }

    const blockchainVerified = await verifyCertificateOnBlockchain(certificate.certId, sha256Hash);
    await logVerification({
      certId: certificate.certId,
      method: "upload",
      userEmail: certificate.studentEmail,
      valid: blockchainVerified,
      blockchainVerified,
      ipAddress: req.ip,
    });

    res.status(200).json({
      valid: blockchainVerified,
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
      await logVerification({
        certId,
        method: "id",
        userEmail: null,
        valid: false,
        blockchainVerified: false,
        ipAddress: req.ip,
        details: { reason: "Certificate not found" },
      });
      return res.status(200).json({ valid: false, blockchainVerified: false });
    }

    if (certificate.isRevoked) {
      await logVerification({
        certId: certificate.certId,
        method: "id",
        userEmail: certificate.studentEmail,
        valid: false,
        blockchainVerified: false,
        ipAddress: req.ip,
        details: { reason: "Revoked certificate" },
      });
      return res.status(200).json({
        valid: false,
        blockchainVerified: false,
        certificate,
        reason: "Certificate has been revoked",
      });
    }

    const blockchainVerified = await verifyCertificateOnBlockchain(certificate.certId, certificate.sha256Hash);
    await logVerification({
      certId: certificate.certId,
      method: "id",
      userEmail: certificate.studentEmail,
      valid: blockchainVerified,
      blockchainVerified,
      ipAddress: req.ip,
    });

    res.status(200).json({
      valid: blockchainVerified,
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

    const filePath = certificate.certificateFilePath || certificate.originalFilePath;
    if (!filePath || !fs.existsSync(filePath)) {
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
