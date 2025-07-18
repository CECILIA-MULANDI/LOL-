const { ethers } = require("hardhat");
async function main() {
  let laughterNFT = await ethers.getContractFactory("LaughterNFT");
  let deployedLaughterNFT = await laughterNFT.deploy();

  console.log(
    "LaughterNFT deployed to:",
    await deployedLaughterNFT.getAddress()
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
