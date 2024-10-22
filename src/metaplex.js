
const { metaplex } = require('@metaplex/js');
const { Connection, Keypair } = require('@solana/web3.js');
require('dotenv').config();

// create and configure a Metaplex instance
const createMetaplexInstance = () => {
    
    const connection = new Connection(process.env.SOLANA_RPC_ENDPOINT); // solana conection
    const walletKeyPair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.WALLET_KEY)));
    // Initing Metaplex with the solana connection + wallet
    return metaplex().useConnection(connection).useWallet(walletKeyPair);
};

module.exports = {
    createMetaplexInstance,
} 