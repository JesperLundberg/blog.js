const { MongoClient } = require("mongodb");
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

  // Insert the blog post into the collection
  const result = await collection.insertOne(blogPost);

  // Close the connection
  client.close();

  return result;
}

async function getAllBlogPosts() {
  // Connect to the database
  const { client, collection } = await connect(config.dbConnectionString);

  // Find all blog posts
  const result = await collection.find({}).toArray();

  // Close the connection
  client.close();

  return result;
}

module.exports = {
  saveBlogPost,
  getAllBlogPosts,
};
