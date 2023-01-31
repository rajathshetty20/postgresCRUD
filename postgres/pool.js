const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_DB || 'localhost',
  database: 'users',
  password: 'password',
  port: '5432',    
});

module.exports = pool;