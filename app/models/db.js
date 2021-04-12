const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gauri',
    password: '@Gauri2055712',
    database: 'node_crud_mysql'
});

module.exports = connection