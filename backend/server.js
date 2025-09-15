const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    "postgres://postgres:arunredg@arunrdspg.chg8q40wm1m2.ap-southeast-6.rds.amazonaws.com:5432/arunrdspg",
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection error:", err.stack));

// --- Routes ---
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

