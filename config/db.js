const mysql = require("mysql2/promise")

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'root123',
    database:'inventory_db'

});

module.exports = mySqlPool; 