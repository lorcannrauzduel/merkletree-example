const { writeFileSync } = require("fs");
const keccak256 = require("keccak256");
const { bufferToHex } = require("../utils/buffer-to-hex.util");

class WhitelistGenerator {
	constructor(addressList, merkleTree, outputFile) {
		this.addressList = addressList;
		this.merkleTree = merkleTree;
		this.outputFile = outputFile;
	}

	generateWhitelistData() {
		// Génère les données pour chaque adresse
		const data = this.addressList.map((address) => {
			// Calcule le hachage de l'adresse
			const leaf = keccak256(address); 

			 // Récupère la preuve de Merkle pour la feuille
			const proof = this.merkleTree.getProof(leaf);

			// Convertit les preuves en hexadécimal
			const tempData = proof.map((x) => bufferToHex(x.data)); 

			return {
				address: address,
				leaf: bufferToHex(leaf),
				proof: tempData,
			};
		});

		return {
			whiteList: data
		};
	}

	writeWhitelistFile(data) {
		const metadata = JSON.stringify(data, null, 2);

		writeFileSync(this.outputFile, metadata, (err) => {
			if (err) {
				// En cas d'erreur pendant l'écriture du fichier
				throw err; 
			}
		});
	}
}

module.exports = {
	WhitelistGenerator,
};
