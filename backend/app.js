require("dotenv").config(); // Load environment variables from a .env file into process.env
const express = require("express");
const db = require("./database"); // Import the database connection

const app = express();

const port = process.env.PORT || 8080;

// Parse JSON bodies for this app. Make sure you put it before your routes.
app.use(express.json());

// Example route: Get list of users
app.get("/users", async (req, res) => {
  try {
    const [users, fields] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
