const express = require("express");

const routes = express.Router();

const blogService = require("../services/blogService");

/**
 */
routes.post("/update/", async (req, res, _) => {
  try {
    const result = await blogService.updateBlogPost(req.body);

    res.status(200).json({ message: result });
  } catch (error) {
    console.error(
      "An error occurred when trying to update blogpost",
      error.message,
    );

    res.status(500).json({ message: error.message });
  }
});

// Export the routes
module.exports = { routes };
