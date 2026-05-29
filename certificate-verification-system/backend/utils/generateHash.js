// Utility function to generate SHA-256 hash of certificate file
// Uses Node.js crypto module

const crypto = require("crypto");
const fs = require("fs");

/**
 * Generate SHA-256 hash of a file
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - SHA-256 hash of the file
 */
const generateFileHash = async (filePath) => {
  try {
    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Create SHA-256 hash
    const hash = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    return hash;
  } catch (error) {
    throw new Error(`Failed to generate hash: ${error.message}`);
  }
};

/**
 * Generate hash from buffer (useful for streaming)
 * @param {Buffer} buffer - File buffer
 * @returns {string} - SHA-256 hash
 */
const generateHashFromBuffer = (buffer) => {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
};

module.exports = { generateFileHash, generateHashFromBuffer };
