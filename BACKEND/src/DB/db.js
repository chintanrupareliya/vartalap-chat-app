const dotenv = require("dotenv");
const mysql = require("mysql2");
dotenv.config();
const db = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "user",
    insecureAuth: true,
  });
};
module.exports = db;
