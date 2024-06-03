const joi = require("joi");

async function validateSchema(blogPost, schema) {
  const { error, value } = schema.validate(blogPost);

  if (error) {
    throw new Error(`Invalid blog post: ${error.message}`);
  }

  return value;
}

async function validateCreateBlogPost(blogPost) {
  const schema = joi.object({
    title: joi.string().trim().empty().required(),
    ingress: joi.string(),
    content: joi.string().required(),
    tags: joi.array().items(joi.string()).required(),
  });

  const value = await validateSchema(blogPost, schema);

  return value;
}

async function validateUpdateBlogPost(blogPost) {
  const schema = joi.object({
    id: joi.string().required(),
    title: joi.string().trim().empty().required(),
    ingress: joi.string(),
    content: joi.string().required(),
    tags: joi.array().items(joi.string()).required(),
  });

  const value = await validateSchema(blogPost, schema);

  return value;
}

module.exports = { validateCreateBlogPost, validateUpdateBlogPost };
