# LaughterNFT Smart Contract

A Solidity smart contract for minting NFTs that represent laughs or funny content. Built with Hardhat and OpenZeppelin.

## Contract Features

- **ERC721 NFT**: Standard NFT implementation with metadata storage
- **Mint Laughs**: Users can mint NFTs with custom metadata URIs
- **Creator Tracking**: Maps each token to its original creator
- **Events**: Emits `LaughMinted` events for indexing

## Setup

```shell
npm install
```

## Deployment

Deploy to Base Sepolia testnet:

```shell
npx hardhat run scripts/deploy.js --network baseTestnet
```

## Contract Address

Deployed on Base Sepolia: `0x13C18946c5BB24E4fFf3D6dF05dd693E1881ff55`

## Usage

```shell
npx hardhat test
npx hardhat node
```
