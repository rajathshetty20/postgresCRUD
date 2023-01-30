const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'users',
  password: 'password',
  port: 5432,    
});

module.exports = pool;