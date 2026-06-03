const mysql = require("mysql2/promise");

const db = mysql.createPool({
  uri: "mysql://root:@localhost/RabbitBank",
  connectionLimit: 15,
  waitForConnections: true,
});

module.exports = db;
