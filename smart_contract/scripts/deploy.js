const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying LaughNft contract...");

  // Get the contract factory
  const LaughterNFT = await ethers.getContractFactory("LaughterNFT");

  // Deploy the contract
  const deployedLaughterNFT = await LaughterNFT.deploy();

  // Wait for deployment to be mined
  await deployedLaughterNFT.waitForDeployment();

  const contractAddress = await deployedLaughterNFT.getAddress();
  console.log("✅ LaughterNFT deployed to:", contractAddress);

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log("📡 Network:", network.name, "Chain ID:", network.chainId);

  return contractAddress;
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
