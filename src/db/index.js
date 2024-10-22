const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const connectDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');
        await createTable(); // Ensure table is created
    } catch (err) {
        console.error('Failed to connect to the database', err);
        process.exit(1);
    }
};

// Function to create table if it doesn't exist
const createTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS nfts (
      id SERIAL PRIMARY KEY,
      mint_address VARCHAR(64) UNIQUE NOT NULL,
      metadata TEXT NOT NULL,
      owner VARCHAR(64) NOT NULL
    );
  `;

    try {
        await client.query(createTableQuery);
        console.log('Table is ready');
    } catch (err) {
        console.error('Error creating table', err);
        throw err;
    }
};

module.exports = {
    client,
    connectDatabase,
};
