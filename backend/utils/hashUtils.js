const crypto = require("crypto");
const fs = require("fs");

const generateSHA256 = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return generateSHA256FromBuffer(fileBuffer);
};

const generateSHA256FromBuffer = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

module.exports = {
  generateSHA256,
  generateSHA256FromBuffer,
};
