import {Pool} from 'pg';

const pool = new Pool({
    host: 'ec2-3-248-121-12.eu-west-1.compute.amazonaws.com',
    port: '5432',
    user: 'jijvjylxqufosp',
    password: '69990da223389dc1c694a5f35777e56901f8172ea8225433208eb264536717d0',
    database: 'd66crckd29vk0'
});

module.exports = pool;