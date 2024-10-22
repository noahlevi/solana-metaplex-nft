const { mintNFT } = require('../services/mintService');
const { client } = require('../db');

const resolvers = {
    Query: {
        allNFTs: async () => {
            const result = await client.query('SELECT * FROM nfts');

            console.log(result.rows);
            // return result.rows;
            // Transform database rows to match the GraphQL schema
            return result.rows.map(nft => ({
                id: nft.id,
                mintAddress: nft.mint_address, // Map mint_address to mintAddress
                metadata: nft.metadata
            }));
        },
        nftByOwner: async (_, { ownerAddress }) => {
            console.log(ownerAddress);
            const result = await client.query('SELECT * FROM nfts WHERE owner=$1', [ownerAddress]);
            // return result.rows;
            // Transform database rows to match the GraphQL schema

            console.log(result.rows);

            return result.rows.map(nft => ({
                id: nft.id,
                mintAddress: nft.mint_address,
                metadata: nft.metadata
            }));
        },
    },

    Mutation: {
        mintNFT: async (_, { metadata, ownerWallet }) => {
            try {
                // debugging 
                console.log("Minting with Metadata:", JSON.stringify(metadata, null, 2));

                const mintAddress = await mintNFT(metadata, ownerWallet);

                return {
                    mintAddress: mintAddress,
                    metadata: JSON.stringify(metadata),
                };
            } catch (error) {
                console.error('Error during minting NFT:', error.message);

                throw new Error('Failed to mint NFT due to an internal error');
            }
        },
    },
};

module.exports = resolvers;