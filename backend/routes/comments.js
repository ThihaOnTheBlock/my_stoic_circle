const express = require("express");
const db = require("../database"); // Adjust the path based on your project structure
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [comments] = await db.pool.query("SELECT * FROM comments");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server error");
  }
});
// Create a new comment
router.post("/", async (req, res) => {
  const { post_id, user_id, comment_text } = req.body;
  if (!post_id || !user_id || !comment_text) {
    return res.status(400).send("Missing required fields");
  }
  try {
    await db.query(
      "INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)",
      [post_id, user_id, comment_text]
    );
    res.status(201).send("Comment created successfully");
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send("Server error");
  }
});

// Get all comments for a post
router.get("/post/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const [comments] = await db.query(
      "SELECT * FROM comments WHERE post_id = ?",
      [postId]
    );
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server error");
  }
});

// Update a comment
router.put("/:id", async (req, res) => {
  const commentId = req.params.id;
  const { comment_text } = req.body;
  try {
    const result = await db.query(
      "UPDATE comments SET comment_text = ? WHERE id = ?",
      [comment_text, commentId]
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).send("Comment not found");
    }
    res.send("Comment updated successfully");
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).send("Server error");
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const result = await db.query("DELETE FROM comments WHERE id = ?", [
      commentId,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(404).send("Comment not found");
    }
    res.send("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
