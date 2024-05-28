const sut = require("../blogService.js");

// mocking databaseRepository module
jest.mock("../../repositories/databaseRepository", () => ({
  saveBlogPost: jest.fn(),
}));

describe("blogService", () => {
  //
  // common mocks
  //
  const databaseRepository = require("../../repositories/databaseRepository");

  afterEach(() => {
    jest.clearAllMocks();
  });

  // mocking databaseRepository.saveBlogPost
  databaseRepository.saveBlogPost.mockImplementation((blogPost) => {
    // Simulate the asynchronous nature of saveBlogPost
    return Promise.resolve({
      acknowledged: true,
      insertedId: "someGeneratedObjectId123",
    });
  });

  describe("createBlogPost", () => {
    it("should throw an error if the blogpost is empty", async () => {
      // Assert
      await expect(sut.createBlogPost("")).rejects.toThrow(
        'Invalid blog post: "value" must be of type object',
      );
    });

    it("should throw an error if the blogpost is missing title", async () => {
      // Arrange
      const blogPost = {
        ingress: "ingress",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Assert
      await expect(sut.createBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "title" is required',
      );
    });

    it("should throw an error if the blogpost is missing content", async () => {
      // Arrange
      const blogPost = {
        title: "title",
        ingress: "ingress",
        tags: ["tag1", "tag2"],
      };

      // Assert
      await expect(sut.createBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "content" is required',
      );
    });

    it("should throw an error if the blogpost is missing tags", async () => {
      // Arrange
      const blogPost = {
        title: "title",
        ingress: "ingress",
        content: "content",
      };

      // Assert
      await expect(sut.createBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "tags" is required',
      );
    });

    it("should return the result of the databaseRepository.createBlogPost", async () => {
      // Arrange
      const blogPost = {
        title: "title",
        ingress: "ingress",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Act
      const result = await sut.createBlogPost(blogPost);

      // Assert
      expect(result).toEqual({
        acknowledged: true,
        insertedId: "someGeneratedObjectId123",
      });
    });
  });
});
