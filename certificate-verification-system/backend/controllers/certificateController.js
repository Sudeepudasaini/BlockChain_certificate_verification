// Certificate controller
// Handles certificate issuance, verification, and management

const Certificate = require("../models/Certificate");
const User = require("../models/User");
const { generateFileHash, generateHashFromBuffer } = require("../utils/generateHash");
const { generateQRCode } = require("../utils/generateQRCode");
const { getContract } = require("../config/blockchain");

/**
 * @route POST /api/certificates/issue
 * @description Issue a new certificate
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const issueCertificate = async (req, res) => {
  try {
    // Only universities can issue certificates
    if (req.userRole !== "university") {
      return res.status(403).json({
        success: false,
        message: "Only universities can issue certificates"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Certificate file is required"
      });
    }

    const {
      studentName,
      studentEmail,
      studentId,
      universityName,
      programName,
      batchYear,
      certificateId,
      issueDate
    } = req.body;

    // Validate inputs
    if (!studentName || !studentEmail || !studentId || !universityName || 
        !programName || !batchYear || !certificateId || !issueDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Check if certificate ID already exists
    const existingCert = await Certificate.findOne({ certificateId });
    if (existingCert) {
      return res.status(400).json({
        success: false,
        message: "Certificate with this ID already exists"
      });
    }

    // Generate hash of the certificate file
    const certificateHash = await generateFileHash(req.file.path);

    // Create new certificate document
    const certificate = new Certificate({
      certificateId,
      studentName,
      studentEmail,
      studentId,
      universityName,
      programName,
      batchYear,
      issueDate: new Date(issueDate),
      certificateHash,
      filePath: req.file.path,
      issuedBy: req.userId,
      status: "pending"
    });

    // Save to MongoDB
    await certificate.save();

    // Now issue on blockchain
    try {
      const contract = getContract();
      
      // Issue certificate on blockchain
      const tx = await contract.issueCertificate(certificateId, certificateHash);
      const receipt = await tx.wait();

      // Update certificate with blockchain details
      certificate.blockchainTxHash = receipt.transactionHash;
      certificate.issuedOnBlockchain = true;
      certificate.status = "issued";

      // Generate QR code with certificate verification URL
      const verificationURL = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify?certificateId=${certificateId}`;
      const qrCode = await generateQRCode(verificationURL);
      certificate.qrCode = qrCode;

      // Save updated certificate
      await certificate.save();

      res.status(201).json({
        success: true,
        message: "Certificate issued successfully on blockchain",
        data: {
          certificateId: certificate.certificateId,
          studentName: certificate.studentName,
          certificateHash: certificate.certificateHash,
          blockchainTxHash: certificate.blockchainTxHash,
          qrCode: certificate.qrCode
        }
      });
    } catch (blockchainError) {
      // If blockchain issuance fails, keep certificate in pending state
      console.error("Blockchain issuance error:", blockchainError);
      
      res.status(500).json({
        success: false,
        message: "Certificate saved but blockchain issuance failed. Please try again.",
        data: {
          certificateId: certificate.certificateId,
          error: blockchainError.message
        }
      });
    }
  } catch (error) {
    console.error("Certificate issuance error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to issue certificate"
    });
  }
};

/**
 * @route POST /api/certificates/verify-upload
 * @description Verify certificate by uploading file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyCertificateByUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Certificate file is required"
      });
    }

    const { certificateId } = req.body;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID is required"
      });
    }

    // Find certificate in database
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found in our records"
      });
    }

    // Generate hash of uploaded file
    const uploadedHash = await generateFileHash(req.file.path);

    // Verify on blockchain
    try {
      const contract = getContract();
      const isValid = await contract.verifyCertificate(certificateId, uploadedHash);

      if (isValid) {
        // Update verification count
        certificate.verificationCount += 1;
        await certificate.save();

        res.status(200).json({
          success: true,
          isValid: true,
          message: "Certificate verified successfully",
          data: {
            certificateId: certificate.certificateId,
            studentName: certificate.studentName,
            studentId: certificate.studentId,
            universityName: certificate.universityName,
            programName: certificate.programName,
            batchYear: certificate.batchYear,
            issueDate: certificate.issueDate,
            qrCode: certificate.qrCode,
            verificationCount: certificate.verificationCount
          }
        });
      } else {
        res.status(200).json({
          success: true,
          isValid: false,
          message: "Certificate hash does not match blockchain record",
          data: {
            certificateId: certificateId,
            reason: "The uploaded file does not match the original certificate"
          }
        });
      }
    } catch (blockchainError) {
      console.error("Blockchain verification error:", blockchainError);
      res.status(500).json({
        success: false,
        message: "Blockchain verification failed",
        error: blockchainError.message
      });
    }
  } catch (error) {
    console.error("Certificate verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Verification failed"
    });
  }
};

/**
 * @route POST /api/certificates/verify-id
 * @description Verify certificate by ID only
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID is required"
      });
    }

    // Find certificate in database
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found in our records"
      });
    }

    // Check if certificate exists on blockchain
    try {
      const contract = getContract();
      const exists = await contract.certificateExists(certificateId);

      if (exists) {
        // Update verification count
        certificate.verificationCount += 1;
        await certificate.save();

        res.status(200).json({
          success: true,
          isValid: true,
          message: "Certificate found on blockchain",
          data: {
            certificateId: certificate.certificateId,
            studentName: certificate.studentName,
            studentId: certificate.studentId,
            universityName: certificate.universityName,
            programName: certificate.programName,
            batchYear: certificate.batchYear,
            issueDate: certificate.issueDate,
            qrCode: certificate.qrCode,
            verificationCount: certificate.verificationCount
          }
        });
      } else {
        res.status(200).json({
          success: true,
          isValid: false,
          message: "Certificate not found on blockchain",
          data: {
            certificateId: certificateId,
            reason: "This certificate has not been issued on the blockchain"
          }
        });
      }
    } catch (blockchainError) {
      console.error("Blockchain verification error:", blockchainError);
      res.status(500).json({
        success: false,
        message: "Blockchain verification failed",
        error: blockchainError.message
      });
    }
  } catch (error) {
    console.error("Certificate verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Verification failed"
    });
  }
};

/**
 * @route GET /api/certificates/:certificateId
 * @description Get certificate details by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId })
      .populate("issuedBy", "name email universityName");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error("Get certificate error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get certificate"
    });
  }
};

/**
 * @route GET /api/certificates/student/:studentId
 * @description Get all certificates of a student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentCertificates = async (req, res) => {
  try {
    const { studentId } = req.params;

    const certificates = await Certificate.find({ studentId, status: "issued" })
      .populate("issuedBy", "name email universityName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error("Get student certificates error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get certificates"
    });
  }
};

/**
 * @route GET /api/certificates/history/all
 * @description Get verification history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVerificationHistory = async (req, res) => {
  try {
    // Get top verified certificates
    const history = await Certificate.find({ status: "issued" })
      .select("certificateId studentName universityName verificationCount createdAt")
      .sort({ verificationCount: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error("Get verification history error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get verification history"
    });
  }
};

/**
 * @route GET /api/certificates/dashboard/university
 * @description Get university dashboard statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUniversityDashboard = async (req, res) => {
  try {
    // Only universities can access their dashboard
    if (req.userRole !== "university") {
      return res.status(403).json({
        success: false,
        message: "Only universities can access this dashboard"
      });
    }

    // Get university user details
    const university = await User.findById(req.userId);

    // Get statistics for this university
    const totalIssued = await Certificate.countDocuments({
      universityName: university.universityName,
      status: "issued"
    });

    const totalPending = await Certificate.countDocuments({
      universityName: university.universityName,
      status: "pending"
    });

    const recentCertificates = await Certificate.find({
      universityName: university.universityName
    })
      .sort({ createdAt: -1 })
      .limit(10);

    const totalVerifications = await Certificate.aggregate([
      {
        $match: {
          universityName: university.universityName,
          status: "issued"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$verificationCount" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        universityName: university.universityName,
        totalIssued,
        totalPending,
        totalVerifications: totalVerifications[0]?.total || 0,
        recentCertificates
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get dashboard data"
    });
  }
};

module.exports = {
  issueCertificate,
  verifyCertificateByUpload,
  verifyCertificateById,
  getCertificateById,
  getStudentCertificates,
  getVerificationHistory,
  getUniversityDashboard
};
