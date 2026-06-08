const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const contractConfigPath = path.join(__dirname, "../config/contractConfig.json");

let contract;

const initializeContract = () => {
  if (contract) return contract;

  if (!fs.existsSync(contractConfigPath)) {
    throw new Error("Contract config not found. Run blockchain deploy first.");
  }

  const contractConfig = JSON.parse(fs.readFileSync(contractConfigPath, "utf8"));
  const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
  const signer = new ethers.Wallet(process.env.CONTRACT_OWNER_PRIVATE_KEY, provider);

  contract = new ethers.Contract(contractConfig.address, contractConfig.abi, signer);
  return contract;
};

const storeCertificateOnBlockchain = async (certId, sha256Hash) => {
  try {
    const contract = initializeContract();
    const registered = await contract.certificateRegistered(certId);
    const tx = registered
      ? await contract.updateCertificateHash(certId, sha256Hash)
      : await contract.storeCertificate(certId, sha256Hash);
    const receipt = await tx.wait(1);
    return { txHash: receipt.hash, success: true, updated: registered };
  } catch (error) {
    console.error("Error storing certificate on blockchain:", error);
    throw error;
  }
};

const verifyCertificateOnBlockchain = async (certId, sha256Hash) => {
  try {
    const contract = initializeContract();
    return await contract.verifyCertificate(certId, sha256Hash);
  } catch (error) {
    console.error("Error verifying certificate on blockchain:", error);
    throw error;
  }
};

const getCertificateHashFromBlockchain = async (certId) => {
  try {
    const contract = initializeContract();
    return await contract.getCertificateHash(certId);
  } catch (error) {
    console.error("Error getting certificate hash from blockchain:", error);
    throw error;
  }
};

const isCertificateRegistered = async (certId) => {
  try {
    const contract = initializeContract();
    return await contract.certificateRegistered(certId);
  } catch (error) {
    console.error("Error checking certificate registration:", error);
    throw error;
  }
};

module.exports = {
  storeCertificateOnBlockchain,
  verifyCertificateOnBlockchain,
  getCertificateHashFromBlockchain,
  isCertificateRegistered,
};
