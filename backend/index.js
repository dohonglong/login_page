const express = require("express");
const pool = require("./db"); // Import the database connection
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios"); // Add this line to import axios
const { OAuth2Client } = require("google-auth-library");

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); // Allow popups to communicate
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none"); // Embed policy for leniency
  next();
});
app.use(cors());
app.use(express.json());

const JWT_SECRET = "Long@1998";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Google Signin Endpoint
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body; // Token from the frontend (Google token)
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //console.log("PAYLOAD: ", payload);
    const username = payload.name;
    // Check if user already exists
    let user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    user = user.rows[0];

    if (!user) {
      //const name = payload.name;
      const first_name = payload.given_name;
      const last_name = payload.family_name;
      const googleId = payload.sub;
      const email = payload.email;
      const created_at = new Date();
      // Insert into users table (for Google login users)
      const result = await pool.query(
        "INSERT INTO users (first_name, last_name, username, email, google_id, login_method, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [first_name, last_name, username, email, googleId, "google", created_at]
      );
      user = result.rows[0];
    }
    // Generate a custom JWT token
    const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token: jwtToken, user }); // Send the custom JWT token and user info
  } catch (error) {
    console.error("Error verifying Google credential:", error.message);
    res.status(401).json({ error: "Invalid Google credential" });
  }
});

// User registration
app.post("/api/register", async (req, res) => {
  const { first_name, last_name, username, password, email } = req.body;
  if (!first_name || !last_name || !username || !password || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  const created_at = new Date();
  try {
    // Ensure username is unique
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username is already in use." });
    }
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, username, password, email, login_method, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        first_name,
        last_name,
        username,
        hashedPassword,
        email,
        "manual",
        created_at,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User registration failed." });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
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
  //console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  //console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token." });
  }
  try {
    // const decoded = jwt.verify(token, JWT_SECRET);
    const result = await pool.query("SELECT * FROM greetings;");
    res.json(result.rows); // Send all rows
  } catch (error) {
    console.error("Token validation error:", error.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
});

// Endpoint to add result to the database
app.post("/api/greetings", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return req.status(400).send("Message is required");
    }
    const result = await pool.query(
      "INSERT INTO greetings (message) VALUES ($1) RETURNING *;",
      [message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//Endpoint to delete
app.delete("/api/greetings/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL
    const result = await pool.query("DELETE FROM greetings WHERE id = $1;", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).send("Greeting not found");
    }
    res.status(204).send(); // Successfully deleted, no content to return
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
