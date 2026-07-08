# NFT Marketplace

A full-stack NFT marketplace where users can mint, list, buy, sell, and auction NFTs. Built with a Next.js frontend and Solidity smart contracts, with images and metadata stored on IPFS via Pinata.

## Features

- **Mint NFTs** — upload an image, add name/description, and mint an ERC-721 token
- **Buy & sell** — list NFTs for a fixed price and purchase listed items
- **Auctions** — start timed auctions, place bids, finish or cancel auctions
- **Wallet integration** — connect with MetaMask via Web3Modal
- **IPFS storage** — files and metadata pinned to IPFS through Pinata

## Tech stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 12, React 18, MUI, Ant Design, Framer Motion |
| Blockchain | Solidity 0.8.24, Hardhat, OpenZeppelin (ERC-721), ethers.js v6 |
| Storage | IPFS via Pinata |

## Prerequisites

- [Node.js](https://nodejs.org) 18+ and npm
- [MetaMask](https://metamask.io) browser extension (only needed to use wallet features)
- A [Pinata](https://app.pinata.cloud) account for IPFS JWT tokens

## Getting started (local)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your Pinata JWT tokens:

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_PINATA_JWT_IMAGE=your_pinata_jwt_here
NEXT_PUBLIC_PINATA_JWT_META=your_pinata_jwt_here
```

Get the tokens from Pinata → **API Keys** → **New Key**.

### 3. Compile the smart contract

```bash
npx hardhat compile
```

Then copy the generated ABI so the frontend can read it:

```bash
cp artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json Context/NFTMarketplace.json
```

### 4. Start a local blockchain

In a separate terminal, keep this running:

```bash
npx hardhat node
```

### 5. Deploy the contract to the local network

```bash
npx hardhat run scripts/deploy.js --network localhost
```

The default deployed address is `0x5FbDB2315678afecb367f032d93F642f64180aa3`, which is already set in [`Context/constants.js`](Context/constants.js). If your deployment prints a different address, update it there.

### 6. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 7. Connect MetaMask to the local network

- Network name: `Localhost`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Currency symbol: `ETH`

Import one of the test accounts printed by `npx hardhat node` (using its private key) to get test ETH.

## Deploying the frontend (Vercel)

The frontend can be deployed to [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo (framework auto-detected as Next.js).
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_PINATA_JWT_IMAGE` and `NEXT_PUBLIC_PINATA_JWT_META`.
4. Deploy.

> **Note:** The deployed frontend shows the full UI, but blockchain interactions (mint / buy / auction) require the smart contract to be deployed on a public network the visitor's wallet can reach. As configured, the contract runs on a local Hardhat node, so on-chain actions work only when running everything locally. To make the live demo fully interactive, deploy the contract to a public testnet (e.g. Sepolia) and update the address and RPC accordingly.

## Project structure

```
contracts/         Solidity smart contracts (NFTMarketplace.sol)
scripts/           Hardhat deploy script
Context/           React context + contract address/ABI wiring
components/        Reusable UI components
pages/             Next.js routes
```
