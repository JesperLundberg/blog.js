const { v4: uuidv4 } = require("uuid");

const databaseRepository = require("../repositories/databaseRepository");
const validator = require("../validators/blogPostValidator");

async function createBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateCreateBlogPost(blogPost);

  // Generate a unique id for the blog post
  validatedBlogPost.id = uuidv4();

  // Set the date of the blog post
  validatedBlogPost.createdDate = new Date().toISOString();
  validatedBlogPost.modifiedDate = new Date().toISOString();

  // Save the blog post to the database
  return await databaseRepository.saveBlogPost(validatedBlogPost);
}

async function updateBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateUpdateBlogPost(blogPost);

  // Update the modified date of the blog post
  validatedBlogPost.modifiedDate = new Date().toISOString();

  // Update the blog post in the database
  return await databaseRepository.saveBlogPost(validatedBlogPost);
}

async function getAllBlogPosts() {
  // Get all blog posts from the database
  return await databaseRepository.getAllBlogPosts();
}

async function getBlogPostById(id) {
  // Validate the id
  const validatedId = await validator.validateId(id);

  // Get a blog post by id from the database
  return await databaseRepository.getBlogPostById(validatedId);
}

module.exports = {
  createBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};
