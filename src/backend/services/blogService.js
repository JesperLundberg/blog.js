const databaseRepository = require("../repositories/databaseRepository");
const validator = require("../validators/blogPostValidator");

async function createBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateCreateBlogPost(blogPost);

  // Save the blog post to the database
  const result = await databaseRepository.saveBlogPost(validatedBlogPost);

  return result;
}

async function updateBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateUpdateBlogPost(blogPost);

  // Update the blog post in the database
  const result = await databaseRepository.saveBlogPost(validatedBlogPost);

  return result;
}

async function getAllBlogPosts() {
  // Get all blog posts from the database
  const result = await databaseRepository.getAllBlogPosts();

  return result;
}

async function getBlogPostById(id) {
  // Get a blog post by id from the database
  const result = await databaseRepository.getBlogPostById(id);

  return result;
}

module.exports = {
  createBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};
