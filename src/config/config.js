require('dotenv').config();

const config = {
  databaseUrl: process.env.DATABASE_URL,
  walletKey: JSON.parse(process.env.WALLET_KEY),
  solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
};

module.exports = config;
