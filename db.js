const Pool=require("pg").Pool;

const pool= new Pool({
    user: "postgres",
    password: "Dch50225",
    host: "localhost",
    port: 5432,
    database: "nhsdb"

}) 

module.exports = pool;