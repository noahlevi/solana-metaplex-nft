const { mintNFT } = require('../services/mintService');
const { client } = require('../db');

const resolvers = {
  Query: {
    allNFTs: async () => {
      const result = await client.query('SELECT * FROM nfts');

      console.log(result);

      return result.rows;
    },
    nftByOwner: async (_, { ownerWallet }) => {
      const result = await client.query('SELECT * FROM nfts WHERE owner=$1', [ownerWallet]);
      return result.rows;
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