const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

class MerkleTreeBuilder {
    constructor(addressList) {
        this.addressList = addressList;
        // Calcul des feuilles à partir de la whiteliste
        this.leaves = this.calculateLeaves(); 
        this.tree = '';
    }

    calculateLeaves() {
      // Mapping des adresses aux valeurs de hachage
        return this.addressList.map((leaf) => keccak256(leaf)); 
    }

    buildMerkleTree() {
      // Construction de l'arbre de Merkle
        this.tree = new MerkleTree(this.leaves, keccak256, {
            sortPairs: true, 
        });
        return this.tree;
    }

    getRoot() {
        return this.tree.getRoot().toString('hex');
    }
}

module.exports = {
    MerkleTreeBuilder,
};
