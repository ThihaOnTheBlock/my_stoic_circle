const express = require("express");
const db = require("../database"); // Adjust according to your project structure
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [likes] = await db.pool.query("SELECT * FROM likes");
    res.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).send("Server error");
  }
});
// Endpoint to like a comment
router.post("/comment/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.body.userId; // In a real application, this would likely come from authenticated user session data

  // Check if the like already exists
  try {
    const [existingLikes] = await db.query(
      "SELECT * FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId]
    );
    if (existingLikes.length > 0) {
      return res.status(400).send("Comment already liked by this user");
    }

    // Add the like
    await db.query(
      "INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)",
      [userId, commentId]
    );
    res.status(201).send("Comment liked successfully");
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to unlike a comment
router.delete("/comment/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.body.userId; // Similarly, this would be obtained from authenticated user data

  try {
    const result = await db.query(
      "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId]
    );
    if (result[0].affectedRows > 0) {
      res.send("Comment unliked successfully");
    } else {
      res.status(404).send("Like not found");
    }
  } catch (error) {
    console.error("Error unliking comment:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
