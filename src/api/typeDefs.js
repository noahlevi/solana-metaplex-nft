const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type NFT {
    id: ID!
    mintAddress: String!
    metadata: String
  }

  # Define an input type for metadata
  input MetadataInput {
    name: String!
    symbol: String
    uri: String!
    sellerFeeBasisPoints: Int!
    creators: [String]  # Use String if it's an array of addresses, adjust as necessary
  }

  type Query {
    allNFTs: [NFT]
    nftByOwner(ownerAddress: String!): [NFT]
  }

  type Mutation {
    mintNFT(metadata: MetadataInput!, ownerWallet: String!): NFT  # Change metadata type to MetadataInput
  }
`;

module.exports = typeDefs;