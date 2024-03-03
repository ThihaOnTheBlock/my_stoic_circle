const express = require("express");
const db = require("../database"); // Adjust the path based on your project structure
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { user_id, post_content } = req.body;
  if (!user_id || !post_content) {
    return res.status(400).send("Missing required fields");
  }
  try {
    await db.query("INSERT INTO posts (user_id, post_content) VALUES (?, ?)", [
      user_id,
      post_content,
    ]);
    res.status(201).send("Post created successfully");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Server error");
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server error");
  }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const [post] = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
    if (post.length > 0) {
      res.json(post[0]);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Server error");
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { post_content } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET post_content = ? WHERE id = ?",
      [post_content, postId]
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).send("Post not found");
    }
    res.send("Post updated successfully");
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Server error");
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await db.query("DELETE FROM posts WHERE id = ?", [postId]);
    if (result[0].affectedRows === 0) {
      return res.status(404).send("Post not found");
    }
    res.send("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
