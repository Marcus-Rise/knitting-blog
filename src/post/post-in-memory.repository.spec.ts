import "reflect-metadata";
import { PostInMemoryRepository } from "./post-in-memory.repository";

describe("PostInMemoryRepository", () => {
  describe("find", () => {
    test("slug is slug", async () => {
      const repo = new PostInMemoryRepository();
      const slug = "slug";
      const item = await repo.find({ slug });

      expect(item).toBeNull();
    });

    test("slug is slug0", async () => {
      const repo = new PostInMemoryRepository();
      const slug = "slug0";
      const item = await repo.find({ slug });

      expect(item).not.toBeNull();
    });

    test("slug is slug3", async () => {
      const repo = new PostInMemoryRepository();
      const slug = "slug3";
      const item = await repo.find({ slug });

      expect(item).not.toBeNull();
    });
  });

  describe("list", () => {
    test("criteria slug", async () => {
      const repo = new PostInMemoryRepository();
      const items = await repo.list({ slug: "slug3" });

      expect(items).toHaveLength(1);
    });

    test("offset limit", async () => {
      const repo = new PostInMemoryRepository();
      const items = await repo.list({}, 1, 4);

      expect(items[0].slug).toEqual("slug1");
      expect(items).toHaveLength(4);
    });
  });
});
