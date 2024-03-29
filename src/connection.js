const { Client } = require('pg');
const dotenv = require('dotenv').config();
// PostgreSQL connection URL format

const postgresURL = process.env.DB_URL;
const client = new Client({
  connectionString: postgresURL, // Use the connection URL
});

module.exports = client;
