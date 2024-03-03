require("dotenv").config(); // Load environment variables from a .env file into process.env
const express = require("express");
const { config } = require("./database"); // Import the database connection
const mysql = require("mysql2");
const app = express();

const app_url = process.env.APP_URL || "http://localhost";
const port = process.env.PORT || 8080;

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the MySQL database successfully");
  connection.end(); // Close the connection after successful connection
});

// Parse JSON bodies for this app.
app.use(express.json());

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.listen(port, () => {
  console.log(`my-stoic api listening at ${app_url}:${port}`);
});
