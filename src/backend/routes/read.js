const express = require("express");

const routes = express.Router();

const blogService = require("../services/blogService");

/**
 * Get all blogposts
 */
routes.get("/read/all", async (_, res, _1) => {
  try {
    const result = await blogService.getAllBlogPosts();

    res.status(200).json({ message: result });
  } catch (error) {
    console.error(
      "An error occurred when trying to get all blogposts",
      error.message,
    );

    res.status(500).json({ message: error.message });
  }
});

routes.get("/read/:id", async (req, res, _1) => {
  try {
    const { id } = req.params;

    const result = await blogService.getBlogPostById(id);

    res.status(200).json({ message: result });
  } catch (error) {
    console.error(
      "An error occurred when trying to get a blogpost by id",
      error.message,
    );

    res.status(500).json({ message: error.message });
  }
});

// Export the routes
module.exports = { routes };
