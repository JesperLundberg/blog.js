const databaseRepository = require("../repositories/databaseRepository.js");
const validator = require("../validators/blogPostValidator.js");

async function createBlogPost(blogPost) {
  try {
    // Validate the blog post
    const validatedBlogPost = await validator.validateBlogPost(blogPost);

    // Save the blog post to the database
    const result = await databaseRepository.saveBlogPost(validatedBlogPost);

    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllBlogPosts() {
  try {
    // Get all blog posts from the database
    const result = await databaseRepository.getAllBlogPosts();

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBlogPost,
  getAllBlogPosts: getAllBlogPosts,
};
