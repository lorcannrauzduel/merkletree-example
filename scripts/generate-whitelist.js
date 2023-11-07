const { addressWhitelisted } = require("../config/address-whitelisted");
const { MerkleTreeBuilder } = require("../modules/merkle-tree-builder.module");
const { WhitelistGenerator } = require("../modules/whitelist-generator.module");

async function main() {
  try {
    const merkleTreeBuilder = new MerkleTreeBuilder(addressWhitelisted);
    const merkleTree = merkleTreeBuilder.buildMerkleTree();

    const whitelistGenerator = new WhitelistGenerator(addressWhitelisted, merkleTree, "whiteList.json");
    const whitelistData = whitelistGenerator.generateWhitelistData();
    whitelistGenerator.writeWhitelistFile(whitelistData);

    console.log("Merkle tree and whitelist generated successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
