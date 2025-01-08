require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "login_database",
  port: 5432,
  password: "honglong1998",
});

// pool.on("connect", () => {
//   console.log("Database connection established!");
// });

module.exports = pool;
