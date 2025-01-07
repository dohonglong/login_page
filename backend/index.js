const express = require("express");
const pool = require("./db"); // Import the database connection

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = "Long@1998";

// User registration
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User already exists or other error." });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch data from the greetings table
app.get("/api/greetings", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const result = await pool.query("SELECT * FROM greetings;");
    res.json(result.rows); // Send all rows
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
});

// // Endpoint to add result to the database
// app.post("/api/greetings", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return req.status(400).send("Message is required");
//     }
//     const result = await pool.query(
//       "INSERT INTO greetings (message) VALUES ($1) RETURNING *;",
//       [message]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

// //Endpoint to delete
// app.delete("/api/greetings/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // Extract the ID from the URL
//     const result = await pool.query("DELETE FROM greetings WHERE id = $1;", [
//       id,
//     ]);
//     if (result.rowCount === 0) {
//       return res.status(404).send("Greeting not found");
//     }
//     res.status(204).send(); // Successfully deleted, no content to return
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
