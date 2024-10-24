# Solana NFT Minting Service

This project is a backend service for minting NFTs on the Solana blockchain using Metaplex and providing a GraphQL API to interact with these NFTs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (latest LTS version recommended)
- Docker and Docker Compose
- Solana CLI installed

## Getting Started

### 1. Install Solana CLI

First, install the `Solana Command Line` tools:

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.18.18/install)"
```

### 2. Add the Solana tools to your PATH

```bash
export PATH="/home/yourusername/.local/share/solana/install/active_release/bin:$PATH"
```


## Create a Solana Testnet Wallet

### 1. Set the CLI to Use Testnet:

```bash
solana config set --url https://api.testnet.solana.com
```

### 2. Generate a New Keypair:

```bash
solana-keygen new --outfile ~/testnet-wallet.json
```

### 3. Retrieve Public Key:

```bash
solana-keygen pubkey ~/testnet-wallet.json
```

### 4. Airdrop Test SOL:

Request test SOL to fund your wallet:

```bash
solana airdrop 2 --keypair ~/testnet-wallet.json
```

Or better use https://faucet.solana.com/ faucet to claim up to 5 SOL


##  Clone the Repository
Clone this project to your local machine:


```bash
git clone git@github.com:noahlevi/solana-metaplex-nft.git
cd solana-metaplex-nft
```


## Set Up Environment Variables
Create a `.env` file (see `example.env`) in the root directory of the project with the following content:

```
DATABASE_URL=postgres://user:password@db:5432/nftdb
WALLET_KEY=[<your-wallet-secret-key-array>]
SOLANA_RPC_ENDPOINT="https://api.devnet.solana.com"
```

## Running the Application


### 1. Build and Start the Docker Containers:

First: 
```bash 
docker-compose down -v # This ensures any volume data is reset, freeing cached states
```   

Then: 

```bash
docker-compose up --build --force-recreate
```


### 2. Access the GraphQL API:

Open GraphQL Playground at: `http://localhost:4000/graphql`