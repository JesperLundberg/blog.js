const express = require("express");

const routes = express.Router();

const blogService = require("../services/blogService.js");

/**
 */
routes.get("/read/all", async (_, res, _1) => {
  try {
    const result = await blogService.getAllBlogPosts();

    return res.status(200).json({ message: result });
  } catch (error) {
    console.error(
      "An error occurred when trying to get all blogposts",
      error.message,
    );

    res.status(500).json({ message: error.message });
  }
});

// Export the routes
module.exports = { routes };
