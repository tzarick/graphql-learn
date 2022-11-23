const { Client } = require('pg');

export const pg_client = new Client();

export const context = {
  pg_client
};