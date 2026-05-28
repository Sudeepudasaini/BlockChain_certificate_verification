const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateRegistry", function () {
  let certificateRegistry;
  let owner;
  let addr1;

  beforeEach(async function () {
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    certificateRegistry = await CertificateRegistry.deploy();
    await certificateRegistry.deploymentTransaction().wait(1);

    [owner, addr1] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await certificateRegistry.owner()).to.equal(await owner.getAddress());
    });
  });

  describe("Store Certificate", function () {
    it("Should store a certificate hash", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await expect(certificateRegistry.storeCertificate(certId, hash))
        .to.emit(certificateRegistry, "CertificateStored")
        .withArgs(certId, hash);

      expect(await certificateRegistry.getCertificateHash(certId)).to.equal(hash);
    });

    it("Should revert on duplicate certId", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await certificateRegistry.storeCertificate(certId, hash);
      await expect(certificateRegistry.storeCertificate(certId, hash)).to.be.revertedWith(
        "Certificate ID already exists"
      );
    });

    it("Should only allow owner to store certificates", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await expect(
        certificateRegistry.connect(addr1).storeCertificate(certId, hash)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Verify Certificate", function () {
    it("Should return true for correct hash", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await certificateRegistry.storeCertificate(certId, hash);
      expect(await certificateRegistry.verifyCertificate(certId, hash)).to.be.true;
    });

    it("Should return false for incorrect hash", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";
      const wrongHash = "wrong123";

      await certificateRegistry.storeCertificate(certId, hash);
      expect(await certificateRegistry.verifyCertificate(certId, wrongHash)).to.be.false;
    });

    it("Should return false for non-existent certId", async function () {
      expect(await certificateRegistry.verifyCertificate("CERT-999", "anyhash")).to.be.false;
    });
  });

  describe("Certificate Registered", function () {
    it("Should return true for registered certificate", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await certificateRegistry.storeCertificate(certId, hash);
      expect(await certificateRegistry.certificateRegistered(certId)).to.be.true;
    });

    it("Should return false for non-registered certificate", async function () {
      expect(await certificateRegistry.certificateRegistered("CERT-999")).to.be.false;
    });
  });

  describe("Revoke Certificate", function () {
    it("Should revoke a certificate", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await certificateRegistry.storeCertificate(certId, hash);
      await expect(certificateRegistry.revokeCertificate(certId))
        .to.emit(certificateRegistry, "CertificateRevoked")
        .withArgs(certId);

      expect(await certificateRegistry.certificateRegistered(certId)).to.be.false;
    });

    it("Should only allow owner to revoke", async function () {
      const certId = "CERT-001";
      const hash = "abc123def456";

      await certificateRegistry.storeCertificate(certId, hash);
      await expect(certificateRegistry.connect(addr1).revokeCertificate(certId)).to.be.revertedWith(
        "Only owner can call this function"
      );
    });

    it("Should revert when revoking non-existent certificate", async function () {
      await expect(certificateRegistry.revokeCertificate("CERT-999")).to.be.revertedWith(
        "Certificate does not exist"
      );
    });
  });
});
