// Test file for CertificateRegistry smart contract
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateRegistry", function () {
  let certificateRegistry;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    certificateRegistry = await CertificateRegistry.deploy();
    await certificateRegistry.waitForDeployment();
  });

  describe("Issue Certificate", function () {
    it("Should issue a certificate successfully", async function () {
      const certificateId = "CERT-001-2024";
      const certificateHash = "abc123def456";

      await expect(
        certificateRegistry.issueCertificate(certificateId, certificateHash)
      ).to.emit(certificateRegistry, "CertificateIssued");

      expect(await certificateRegistry.certificateExists(certificateId)).to.be.true;
    });

    it("Should not allow duplicate certificate IDs", async function () {
      const certificateId = "CERT-001-2024";
      const certificateHash = "abc123def456";

      await certificateRegistry.issueCertificate(certificateId, certificateHash);

      await expect(
        certificateRegistry.issueCertificate(certificateId, certificateHash)
      ).to.be.revertedWith("Certificate already issued");
    });

    it("Should not allow empty certificate ID", async function () {
      await expect(
        certificateRegistry.issueCertificate("", "abc123def456")
      ).to.be.revertedWith("Certificate ID cannot be empty");
    });
  });

  describe("Verify Certificate", function () {
    beforeEach(async function () {
      const certificateId = "CERT-001-2024";
      const certificateHash = "abc123def456";
      await certificateRegistry.issueCertificate(certificateId, certificateHash);
    });

    it("Should verify a valid certificate", async function () {
      const certificateId = "CERT-001-2024";
      const certificateHash = "abc123def456";

      const isValid = await certificateRegistry.verifyCertificate(
        certificateId,
        certificateHash
      );
      expect(isValid).to.be.true;
    });

    it("Should reject an invalid certificate hash", async function () {
      const certificateId = "CERT-001-2024";
      const wrongHash = "wrong_hash_here";

      const isValid = await certificateRegistry.verifyCertificate(
        certificateId,
        wrongHash
      );
      expect(isValid).to.be.false;
    });

    it("Should not verify non-existent certificate", async function () {
      await expect(
        certificateRegistry.verifyCertificate("CERT-999-2024", "abc123def456")
      ).to.be.revertedWith("Certificate not found");
    });
  });

  describe("Get Certificate Hash", function () {
    it("Should return the correct certificate hash", async function () {
      const certificateId = "CERT-001-2024";
      const certificateHash = "abc123def456";

      await certificateRegistry.issueCertificate(certificateId, certificateHash);
      const retrievedHash = await certificateRegistry.getCertificateHash(certificateId);

      expect(retrievedHash).to.equal(certificateHash);
    });
  });

  describe("Get Total Issued Certificates", function () {
    it("Should return correct count of issued certificates", async function () {
      await certificateRegistry.issueCertificate("CERT-001-2024", "hash1");
      await certificateRegistry.issueCertificate("CERT-002-2024", "hash2");

      const total = await certificateRegistry.getTotalIssuedCertificates();
      expect(total).to.equal(2);
    });
  });
});
