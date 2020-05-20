//kết nối database.

'use strict';
const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "apitest"
});

module.exports = db