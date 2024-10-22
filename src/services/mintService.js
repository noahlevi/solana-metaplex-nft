const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js'); // Update per new imports
const { Connection, Keypair } = require('@solana/web3.js');
const { client } = require('../db');
require('dotenv').config();

const mintNFT = async (metadata, ownerWallet) => {
    try {
        // Solana net connection
        const connection = new Connection(process.env.SOLANA_RPC_ENDPOINT);

        // Metaplex with the wallet
        const walletKeyPair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.WALLET_KEY)));
        const metaplexInstance = Metaplex.make(connection).use(keypairIdentity(walletKeyPair)); // Updated initialization
        
        // debugging
        console.log("DB connection established.");
        console.log("Minting with Metadata:", JSON.stringify(metadata));
        console.log("BEFORE CREATING NFT");

        // MAIN NFT minting
        const { mintAddress } = await metaplexInstance.nfts().create({
            uri: metadata.uri, // Get the URI directly from metadata
            name: metadata.name,
            sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
            creators: metadata.creators,
        });

        // debugging
        console.log(mintAddress);
        console.log("AFTER CREATING NFT");

        await client.query(
            'INSERT INTO nfts(mint_address, metadata, owner) VALUES($1, $2, $3);',
            [mintAddress.toString(), JSON.stringify(metadata), ownerWallet]
        );

        await client.query('COMMIT');

        return mintAddress;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error('Minting NFT failed due to: ' + error.message);
    }
};

module.exports = {
    mintNFT,
};