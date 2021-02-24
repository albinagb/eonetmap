const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "public");
app
  .use(express.static(publicPath))
  .get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  })
  .get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      const results = { results: result ? result.rows : null };
      res.render("pages/db", results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => {
    console.log(`Server is up on ${PORT}!`);
  });
