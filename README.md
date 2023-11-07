
# Les arbres de Merkle 

## Description

Ce projet a pour but de montrer comment utiliser les arbres de Merkle dans la blockchain, avec Solidity, Hardhat et JavaScript. Les arbres de Merkle sont essentielles pour garantir l'intégrité des données dans un environnement décentralisé.

## Installation

```bash 
pnpm install
```

## Scripts

-   **Exécution des Tests** : Pour lancer les tests du projet, utilisez la commande suivante :

```bash 
pnpm test
```

-   **Génération de liste blanche** : Pour générer une liste blanche à partir de l'arbre Merkle :

```bash 
pnpm generate-whitelist
```

## Modules

Le projet est organisé en utilisant des modules pour séparer la logique :

-   **`merkle-tree-builder.module`** : Contient une classe `MerkleTreeBuilder` qui permet de construire un arbre Merkle à partir d'une liste d'adresses.
    
-   **`whitelist-generator.module`** : Contient une classe `WhitelistGenerator` qui génère une liste blanche à partir de l'arbre Merkle. 
    
-   **`buffer-to-hex.util`** : Utilisé pour convertir des tampons en chaînes hexadécimales.
    

## Smart Contract

Le smart contract `MerkleProof.sol` stocke la racine de Merkle au déploiement et fournit une fonction `verify` pour vérifier les preuves de Merkle.

## Configuration
Une liste blanche d'adresses est définie dans le fichier `config/address-whitelisted.js` :
```javascript 
const addressWhitelisted = [
	'0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
	'0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
	'0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
];
```

**Note**: L'adresse de la racine de Merkle dans le contrat doit correspondre à la racine de Merkle générée localement pour que les tests fonctionnent correctement.
