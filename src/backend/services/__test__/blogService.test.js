const sut = require("../blogService");

// mocking databaseRepository module
jest.mock("../../repositories/databaseRepository", () => ({
  saveBlogPost: jest.fn(),
  getAllBlogPosts: jest.fn(),
  getBlogPostById: jest.fn(),
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
            _id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
            title: "first blog post",
            ingress: "Some ingress",
            content: "Some content",
            createdDate: new Date("1 2 2023").toISOString(),
            modifiedDate: new Date("3 5 2023").toISOString(),
            tags: ["tag1", "tag2"],
          },
          {
            _id: "6655c79807143ec3938819a5",
            title: "second blog post",
            ingress: "Some ingress in the second blog post",
            content: "Some content in the second blog post",
            createdDate: new Date("10 12 2023").toISOString(),
            modifiedDate: new Date("12 4 2023").toISOString(),
            tags: ["tag2", "tag3"],
          },
        ]);
      });

      // Act
      const result = await sut.getAllBlogPosts();

      // Assert
      expect(result).toEqual([
        {
          _id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
          title: "first blog post",
          ingress: "Some ingress",
          content: "Some content",
          createdDate: "2023-01-01T23:00:00.000Z",
          modifiedDate: "2023-03-04T23:00:00.000Z",
          tags: ["tag1", "tag2"],
        },
        {
          _id: "6655c79807143ec3938819a5",
          title: "second blog post",
          ingress: "Some ingress in the second blog post",
          content: "Some content in the second blog post",
          createdDate: "2023-10-11T22:00:00.000Z",
          modifiedDate: "2023-12-03T23:00:00.000Z",
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

  describe("getBlogPostById", () => {
    // mocking databaseRepository.getBlogPostById
    databaseRepository.getBlogPostById.mockImplementation((id) => {
      // Simulate the asynchronous nature of getBlogPostById
      return Promise.resolve({
        _id: id,
        title: "first blog post",
        ingress: "Some ingress",
        content: "Some content",
        createdDate: new Date("1 2 2023").toISOString(),
        modifiedDate: new Date("3 5 2023").toISOString(),
        tags: ["tag1", "tag2"],
      });
    });

    it("should throw an error if the id is empty", async () => {
      // Assert
      await expect(sut.getBlogPostById("")).rejects.toThrow(
        'Invalid blog post: "value" is not allowed to be empty',
      );
    });
  });

  it("should throw an error if the id is not a valid uuid", async () => {
    // Assert
    await expect(sut.getBlogPostById("invalid-uuid")).rejects.toThrow(
      'Invalid blog post: "value" must be a valid GUID',
    );
  });

  it("should return the result of the databaseRepository.getBlogPostById", async () => {
    // Arrange
    const id = "3f54fcc2-c63f-4c48-96ea-0149cc208f9b";

    // Act
    const result = await sut.getBlogPostById(id);

    // Assert
    expect(result).toEqual({
      _id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
      title: "first blog post",
      ingress: "Some ingress",
      content: "Some content",
      createdDate: "2023-01-01T23:00:00.000Z",
      modifiedDate: "2023-03-04T23:00:00.000Z",
      tags: ["tag1", "tag2"],
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
        id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
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
        id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
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
        id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
        title: "title",
        ingress: "ingress",
        content: "content",
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
      };

      // Assert
      await expect(sut.updateBlogPost(blogPost)).rejects.toThrow(
        'Invalid blog post: "tags" is required',
      );
    });

    it("should return the result of the databaseRepository.updateBlogPost", async () => {
      // Arrange
      const blogPost = {
        id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
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
        insertedId: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
      });
    });

    it("should return the result of the databaseRepository.updateBlogPost with ingress missing (as it's optional)", async () => {
      // Arrange
      const blogPost = {
        id: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
        title: "title",
        content: "content",
        tags: ["tag1", "tag2"],
      };

      // Act
      const result = await sut.updateBlogPost(blogPost);

      // Assert
      expect(result).toEqual({
        acknowledged: true,
        insertedId: "3f54fcc2-c63f-4c48-96ea-0149cc208f9b",
      });
    });
  });
});
