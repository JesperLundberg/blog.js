const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

async function connect(url) {
  // Create a new MongoClient and connect to it
  const client = await MongoClient.connect(url);

  // Get the database and collection
  const db = client.db("blogdb");
  const collection = db.collection("blogposts");

  // Return the client and collection
  return { client, collection };
}

async function saveBlogPost(blogPost) {
  // Connect to the database
  const { client, collection } = await connect(config.dbConnectionString);
  const query = { id: blogPost.id };
  const options = { upsert: true };

  // Insert the blog post into the collection
  const result = await collection.updateOne(query, { $set: blogPost }, options);

  // Close the connection
  client.close();

  return result;
}

async function getAllBlogPosts() {
  // Connect to the database
  const { client, collection } = await connect(config.dbConnectionString);

  // Find all blog posts
  const result = await collection.find({}).toArray();

  // FIXME: Maybe not send the entire content of the blog post to cut down on the amount of data sent

  // Close the connection
  client.close();

  return result;
}

async function getBlogPostById(id) {
  // Connect to the database
  const { client, collection } = await connect(config.dbConnectionString);

  // Find the blog post by id
  const result = await collection.findOne({
    id: id,
  });

  // Close the connection
  client.close();

  return result;
}

module.exports = {
  saveBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};
