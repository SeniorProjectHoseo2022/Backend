require('dotenv').config();

const db_config = {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password :  process.env.DB_PW,
    port :  process.env.DB_PORT,
    database :  process.env.DB_SCHEMA,
    connectionLimit : 10
};
module.exports = db_config;
