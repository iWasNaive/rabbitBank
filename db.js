const mysql = require("mysql2/promise");
// mysql://root:Q0AT80tEZtjfkxhOKPRLa0fv@rabib:3306/elastic_sinoussi"
const db = mysql.createPool({
  uri: "mysql://root:Q0AT80tEZtjfkxhOKPRLa0fv@rabib:3306/elastic_sinoussi",
  connectionLimit: 2,
  waitForConnections: true,
});

module.exports = db;
