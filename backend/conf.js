const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOURPASSWORD",
  database: "YOURDBNAME",
});

module.exports = connection;
