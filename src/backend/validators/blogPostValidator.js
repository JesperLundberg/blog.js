const joi = require("joi");

async function validateBlogPost(blogPost) {
  const schema = joi.object({
    title: joi.string().trim().empty().required(),
    ingress: joi.string(),
    content: joi.string().required(),
    tags: joi.array().items(joi.string()).required(),
  });

  const { error, value } = schema.validate(blogPost);

  if (error) {
    throw new Error(`Invalid blog post: ${error.message}`);
  }

  return value;
}

module.exports = { validateBlogPost };
