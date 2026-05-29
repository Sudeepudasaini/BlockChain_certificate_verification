// Deployment script for CertificateRegistry smart contract

async function main() {
  console.log("Starting CertificateRegistry deployment...");

  // Get the contract factory
  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  
  // Deploy the contract
  console.log("Deploying CertificateRegistry contract...");
  const certificateRegistry = await CertificateRegistry.deploy();
  
  // Wait for the deployment to complete
  await certificateRegistry.waitForDeployment();
  
  const contractAddress = await certificateRegistry.getAddress();
  
  console.log("✅ CertificateRegistry deployed successfully!");
  console.log("📝 Contract Address:", contractAddress);
  console.log("\n⚠️  IMPORTANT: Copy this contract address and paste it in backend/.env as CONTRACT_ADDRESS");
  console.log("CONTRACT_ADDRESS=" + contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
