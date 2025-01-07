const express = require("express");
const pool = require("./db"); // Import the database connection
const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint to fetch data from the greetings table
app.get("/api/greetings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM greetings;");
    res.json(result.rows); // Send all rows
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
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
