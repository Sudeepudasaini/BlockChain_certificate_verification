// Blockchain configuration file
// This file sets up connection to Hardhat local blockchain via ethers.js

const { ethers } = require("ethers");

// Initialize blockchain connection
let contract = null;
let provider = null;
let signer = null;

const initializeBlockchain = async () => {
  try {
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || "http://127.0.0.1:8545";
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;

    // Check if contract address and private key are set
    if (!contractAddress || !privateKey) {
      throw new Error("CONTRACT_ADDRESS and PRIVATE_KEY must be set in .env file");
    }

    // Create provider to connect to Hardhat local blockchain
    provider = new ethers.JsonRpcProvider(rpcUrl);

    // Create signer using private key
    signer = new ethers.Wallet(privateKey, provider);

    // Contract ABI - must match the deployed contract
    const contractABI = [
      "event CertificateIssued(string indexed certificateId, string certificateHash, address indexed issuer, uint256 timestamp)",
      "event CertificateVerified(string indexed certificateId, bool isValid, uint256 timestamp)",
      "function issueCertificate(string memory certificateId, string memory certificateHash)",
      "function verifyCertificate(string memory certificateId, string memory providedHash) returns (bool)",
      "function getCertificateHash(string memory certificateId) view returns (string)",
      "function getCertificateIssuer(string memory certificateId) view returns (address)",
      "function certificateExists(string memory certificateId) view returns (bool)",
      "function getTotalIssuedCertificates() view returns (uint256)",
      "function getCertificateAtIndex(uint256 index) view returns (string)"
    ];

    // Create contract instance with signer
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("✅ Blockchain initialized successfully");
    console.log("📍 Contract Address:", contractAddress);
    console.log("🔗 RPC URL:", rpcUrl);

    return contract;
  } catch (error) {
    console.error("❌ Blockchain initialization failed:", error.message);
    throw error;
  }
};

// Get contract instance
const getContract = () => {
  if (!contract) {
    throw new Error("Blockchain not initialized. Call initializeBlockchain first.");
  }
  return contract;
};

// Get provider instance
const getProvider = () => {
  if (!provider) {
    throw new Error("Provider not initialized. Call initializeBlockchain first.");
  }
  return provider;
};

// Get signer instance
const getSigner = () => {
  if (!signer) {
    throw new Error("Signer not initialized. Call initializeBlockchain first.");
  }
  return signer;
};

module.exports = {
  initializeBlockchain,
  getContract,
  getProvider,
  getSigner
};
