const { ethers } = require("hardhat");

async function main() {
  const merkleRoot = "0xa189ac9a096862334c0f4fbf8eb64cf885bdb5e93064d9d9314184b4f4aa570b"; // Replace with your merkleRoot value

  const MerkleProof = await ethers.getContractFactory("MerkleProof");
  const merkleProofContract = await MerkleProof.deploy(merkleRoot);

  await merkleProofContract.waitForDeployment();

  const contractAddress = merkleProofContract.getAddress();

  console.log(`MerkleProof deployed to: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
