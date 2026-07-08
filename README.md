# NFT Marketplace

A full-stack NFT marketplace where users can mint, list, buy, sell, and auction NFTs. Built with a Next.js frontend and Solidity smart contracts, with images and metadata stored on IPFS via Pinata.

## Features

- **Mint NFTs** — upload an image, add name/description, and mint an ERC-721 token
- **Buy & sell** — list NFTs for a fixed price and purchase listed items
- **Auctions** — start timed auctions, place bids, finish or cancel auctions
- **Wallet integration** — connect with MetaMask via Web3Modal
- **IPFS storage** — files and metadata pinned to IPFS through Pinata

## Tech stack

| Layer      | Technologies                                                   |
| ---------- | -------------------------------------------------------------- |
| Frontend   | Next.js 12, React 18, MUI, Ant Design, Framer Motion           |
| Blockchain | Solidity 0.8.24, Hardhat, OpenZeppelin (ERC-721), ethers.js v6 |
| Storage    | IPFS via Pinata                                                |

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

# Optional: leave empty to use the local Hardhat node.
# Set to a Sepolia RPC URL to read from the live testnet contract.
NEXT_PUBLIC_RPC_URL=
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

[`Context/constants.js`](Context/constants.js) is currently set to the live **Sepolia** deployment. To run fully against your local node instead, copy the address printed by this command into `NFTMarketplaceAddress` there.

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

## Deploying to a public testnet (Sepolia)

To make the app usable by anyone (not just on your machine), deploy the contract to the Sepolia testnet.

Add these to your `.env`:

```env
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_key   # Alchemy/Infura RPC
PRIVATE_KEY=your_deployer_wallet_private_key                        # a throwaway test wallet
```

Fund the deployer wallet with test ETH from a [Sepolia faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia), then deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the printed address into `NFTMarketplaceAddress` in [`Context/constants.js`](Context/constants.js).

> `PRIVATE_KEY` is used only for deployment and is never exposed to the browser. Never commit `.env` or use a wallet holding real funds.

## Deploying the frontend (Vercel)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repo (auto-detected as Next.js).
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_PINATA_JWT_IMAGE`, `NEXT_PUBLIC_PINATA_JWT_META`, and `NEXT_PUBLIC_RPC_URL` (do **not** add `PRIVATE_KEY`).
4. Deploy.

With the contract on Sepolia and `NEXT_PUBLIC_RPC_URL` set, the deployed site is fully interactive — connect MetaMask (switched to Sepolia) to mint, buy, and bid.

## Project structure

```
contracts/         Solidity smart contracts (NFTMarketplace.sol)
scripts/           Hardhat deploy script
Context/           React context + contract address/ABI wiring
components/        Reusable UI components
pages/             Next.js routes
```
