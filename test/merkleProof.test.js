const { expect } = require('chai');
const { ethers } = require('hardhat');
const { MerkleTreeBuilder } = require('../modules/merkle-tree-builder.module');
const { WhitelistGenerator } = require('../modules/whitelist-generator.module');

describe('MerkleProof', function () {
	let merkleProof;
	const merkleRoot =
		'0xa189ac9a096862334c0f4fbf8eb64cf885bdb5e93064d9d9314184b4f4aa570b';

	before(async function () {
		const MerkleProof = await ethers.getContractFactory('MerkleProof');
		merkleProof = await MerkleProof.deploy(merkleRoot);
		await merkleProof.waitForDeployment();
	});

	it('should return false for an invalid proof', async function () {
		// Test d'une preuve invalide
		const invalidProof = [
			'0xdf1e3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486',
			'0x5921b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229',
		];
		const invalidLeaf =
			'0x929bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb';

		const result = await merkleProof.verify(
			invalidProof,
			invalidLeaf
		);
		expect(result).to.be.false;
	});

	it('should build a merkle tree and generate a whitelist', function () {
		// Test de la construction de l'arbre de Merkle et de la génération d'une whitelist
		const addressList = [
			'0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
			'0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
			'0x5b38da6a701c568545dcfcb03fcb875f56beddc4',
		];

		try {
			const merkleTreeBuilder = new MerkleTreeBuilder(addressList);
			const merkleTree = merkleTreeBuilder.buildMerkleTree();

			const whitelistGenerator = new WhitelistGenerator(
				addressList,
				merkleTree
			);
			const whitelistData = whitelistGenerator.generateWhitelistData();

			expect(whitelistData).to.be.an('object');
			expect(whitelistData.whiteList).to.be.an('array');
			expect(whitelistData.whiteList).to.have.lengthOf(addressList.length);

		} catch (error) {
			throw new Error('test failed: ' + error.message);
		}
	});

	it('should return the correct merkle root', async function () {
		// Test du retour de la racine de Merkle correcte
		expect(await merkleProof.merkleRoot()).to.equal(merkleRoot);
	});

	it('should return true for a valid proof', async function () {
		// Test d'une preuve valide
		const proof = [
			'0xdfbe3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486',
			'0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229',
		];
		const leaf =
			'0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb';
		const result = await merkleProof.verify(proof, leaf);
		expect(result).to.be.true;
	});
});
