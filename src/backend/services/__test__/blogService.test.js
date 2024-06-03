const sut = require("../blogService");

// mocking databaseRepository module
jest.mock("../../repositories/databaseRepository", () => ({
  saveBlogPost: jest.fn(),
  getAllBlogPosts: jest.fn(),
  updateBlogPost: jest.fn(),
}));

describe("blogService", () => {
  //
  // common mocks
  //
  const databaseRepository = require("../../repositories/databaseRepository");

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createBlogPost", () => {
    // mocking databaseRepository.saveBlogPost
    databaseRepository.saveBlogPost.mockImplementation((_) => {
      // Simulate the asynchronous nature of saveBlogPost
      return Promise.resolve({
        acknowledged: true,
      });
    });

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
      expect(result.acknowledged).toBeTruthy();
    });

    it("should return the result of the databaseRepository.createBlogPost with ingress missing (as it's optional)", async () => {
      // Arrange
      const blogPost = {
        title: "title",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Act
      const result = await sut.createBlogPost(blogPost);

      // Assert
      expect(result.acknowledged).toBeTruthy();
    });
  });

  describe("getAllBlogPosts", () => {
    it("should return the result of the databaseRepository.getAllBlogPosts", async () => {
      // Arrange
      // mocking databaseRepository.getAllBlogPosts
      databaseRepository.getAllBlogPosts.mockImplementation(() => {
        // Simulate the asynchronous nature of getAllBlogPosts
        return Promise.resolve([
          {
            _id: "6655c79807143ec3938819a4",
            title: "first blog post",
            ingress: "Some ingress",
            content: "Some content",
            tags: ["tag1", "tag2"],
          },
          {
            _id: "6655c79807143ec3938819a5",
            title: "second blog post",
            ingress: "Some ingress in the second blog post",
            content: "Some content in the second blog post",
            tags: ["tag2", "tag3"],
          },
        ]);
      });

      // Act
      const result = await sut.getAllBlogPosts();

      // Assert
      expect(result).toEqual([
        {
          _id: "6655c79807143ec3938819a4",
          title: "first blog post",
          ingress: "Some ingress",
          content: "Some content",
          tags: ["tag1", "tag2"],
        },
        {
          _id: "6655c79807143ec3938819a5",
          title: "second blog post",
          ingress: "Some ingress in the second blog post",
          content: "Some content in the second blog post",
          tags: ["tag2", "tag3"],
        },
      ]);
    });

    it("should return an empty array if there are no blog posts", async () => {
      // Arrange
      // mocking databaseRepository.getAllBlogPosts
      databaseRepository.getAllBlogPosts.mockImplementation(() => {
        // Simulate the asynchronous nature of getAllBlogPosts
        return Promise.resolve([]);
      });

      // Act
      const result = await sut.getAllBlogPosts();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("updateBlogPost", () => {
    // mocking databaseRepository.updateBlogPost
    databaseRepository.updateBlogPost.mockImplementation((blogPost) => {
      // Simulate the asynchronous nature of updateBlogPost
      return Promise.resolve({
        acknowledged: true,
        insertedId: blogPost.id,
      });
    });

    // mocking databaseRepository.saveBlogPost
    databaseRepository.saveBlogPost.mockImplementation((blogPost) => {
      // Simulate the asynchronous nature of saveBlogPost
      return Promise.resolve({
        acknowledged: true,
        insertedId: blogPost.id,
      });
    });

    it("should throw an error if the blogpost is empty", async () => {
      // Assert
      await expect(sut.updateBlogPost("")).rejects.toThrow(
        'Invalid blog post: "value" must be of type object',
      );
    });

    it("should throw an error if the blogpost is missing id", async () => {
      // Arrange
      const blogPost = {
        title: "title",
        ingress: "ingress",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Assert
      await expect(sut.updateBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "id" is required',
      );
    });

    it("should throw an error if the blogpost is missing title", async () => {
      // Arrange
      const blogPost = {
        id: "6655c79807143ec3938819a4",
        ingress: "ingress",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Assert
      await expect(sut.updateBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "title" is required',
      );
    });

    it("should throw an error if the blogpost is missing content", async () => {
      // Arrange
      const blogPost = {
        id: "6655c79807143ec3938819a4",
        title: "title",
        ingress: "ingress",
        tags: ["tag1", "tag2"],
      };

      // Assert
      await expect(sut.updateBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "content" is required',
      );
    });

    it("should throw an error if the blogpost is missing tags", async () => {
      // Arrange
      const blogPost = {
        id: "6655c79807143ec3938819a4",
        title: "title",
        ingress: "ingress",
        content: "content",
      };

      // Assert
      await expect(sut.updateBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "tags" is required',
      );
    });

    it("should return the result of the databaseRepository.updateBlogPost", async () => {
      // Arrange
      const blogPost = {
        id: "6655c79807143ec3938819a4",
        title: "title",
        ingress: "ingress",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Act
      const result = await sut.updateBlogPost(blogPost);

      // Assert
      expect(result).toEqual({
        acknowledged: true,
        insertedId: "6655c79807143ec3938819a4",
      });
    });

    it("should return the result of the databaseRepository.updateBlogPost with ingress missing (as it's optional)", async () => {
      // Arrange
      const blogPost = {
        id: "6655c79807143ec3938819a4",
        title: "title",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Act
      const result = await sut.updateBlogPost(blogPost);

      // Assert
      expect(result).toEqual({
        acknowledged: true,
        insertedId: "6655c79807143ec3938819a4",
      });
    });
  });
});
