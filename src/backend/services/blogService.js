const databaseRepository = require("../repositories/databaseRepository.js");
const validator = require("../validators/blogPostValidator.js");

async function createBlogPost(blogPost) {
  // Validate the blog post
  const validatedBlogPost = await validator.validateBlogPost(blogPost);

  // Save the blog post to the database
  await databaseRepository.saveBlogPost(validatedBlogPost);

  return result;
}
