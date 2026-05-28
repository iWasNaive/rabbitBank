const mysql = require("mysql2/promise");

const db = mysql.createPool({
  uri: "mysql://root:@localhost:3306/RabbitBank",
  connectionLimit: 10,
  waitForConnections: true,
});

module.exports = db;
