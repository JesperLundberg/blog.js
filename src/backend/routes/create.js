const express = require("express");

const routes = express.Router();

const blogService = require("../services/blogService.js");

/**
 */
routes.post("/create", async (req, res, next) => {
  try {
    req.body; // Here is the posted info from the client

    // blogService.createBlogPost(req.body);

    // Strip any leading/trailing whitespace from the path read from the query string
    // const fullFilePath = req.query.path.trim();
    // Set the correct mime type for the file
    // res.header("Content-Type", "application/epub+zip");
    // res.download(fullFilePath);

    return res.json({ message: req.body });
  } catch (error) {
    console.error(
      "An error occurred when trying to create blogpost",
      error.message,
    );
    next(error);
  }
});

// Export the routes
module.exports = { routes };
