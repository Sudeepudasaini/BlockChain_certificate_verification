// Utility function to generate QR codes
// Uses qrcode npm package

const qrcode = require("qrcode");

/**
 * Generate QR code as data URL
 * @param {string} data - Data to encode in QR code
 * @returns {Promise<string>} - QR code as data URL
 */
const generateQRCode = async (data) => {
  try {
    // Generate QR code as data URL
    const qrDataUrl = await qrcode.toDataURL(data, {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    });

    return qrDataUrl;
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error.message}`);
  }
};

/**
 * Generate QR code as file
 * @param {string} data - Data to encode in QR code
 * @param {string} filePath - Path to save QR code image
 * @returns {Promise<void>}
 */
const generateQRCodeFile = async (data, filePath) => {
  try {
    await qrcode.toFile(filePath, data, {
      errorCorrectionLevel: "H",
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    });
  } catch (error) {
    throw new Error(`Failed to generate QR code file: ${error.message}`);
  }
};

module.exports = { generateQRCode, generateQRCodeFile };
