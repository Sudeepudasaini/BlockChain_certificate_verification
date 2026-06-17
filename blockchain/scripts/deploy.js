const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying CertificateRegistry contract...");

  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  const contract = await CertificateRegistry.deploy();
  await contract.deploymentTransaction().wait(1);

  const contractAddress = await contract.getAddress();
  console.log("CertificateRegistry deployed to:", contractAddress);

  const abi = CertificateRegistry.interface.formatJson();

  const contractConfig = {
    address: contractAddress,
    abi: JSON.parse(abi),
  };

  const backendConfigPath = path.join(__dirname, "../../backend/config/contractConfig.json");
  const frontendConfigPath = path.join(__dirname, "../../frontend/src/config/contractConfig.json");

  fs.writeFileSync(backendConfigPath, JSON.stringify(contractConfig, null, 2));
  fs.writeFileSync(frontendConfigPath, JSON.stringify(contractConfig, null, 2));

  console.log("Contract config saved to backend and frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
