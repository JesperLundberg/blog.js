const databaseRepository = require("../repositories/databaseRepository");
const validator = require("../validators/blogPostValidator");

async function createBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateBlogPost(blogPost);

  // Save the blog post to the database
  const result = await databaseRepository.saveBlogPost(validatedBlogPost);

  return result;
}

async function getAllBlogPosts() {
  // Get all blog posts from the database
  const result = await databaseRepository.getAllBlogPosts();

  return result;
}

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};
