const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "arunrdspg.chg8q40wm1m2.ap-southeast-6.rds.amazonaws.com",  // e.g. arunrdspg.xxxxx.ap-southeast-2.rds.amazonaws.com
  database: "arunrdspg",
  password: "arunredg",
  port: 5432,
ssl: {
    require: true,
    rejectUnauthorized: false  // RDS uses AWS-managed certs
  }
});

module.exports = pool;

// Ensure table exists
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100)
  )
`);

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection error:", err.stack));

// Routes
app.get("/api/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/api/users", async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;
  const result = await pool.query(
    "INSERT INTO users (firstName, lastName, phone, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, phone, email]
  );
  res.json(result.rows[0]);
});

app.delete("/api/users/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
  res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
