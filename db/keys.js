const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: process.env.DB_PASS_PG,
    database: 'cdadb'
});

module.exports = pool;