import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: process.env.BD_PASS_PG,
    database: 'cdadb'
});

module.exports = pool;