import "reflect-metadata";
import { PostServiceMock } from "./post.service.mock";

describe("PostServiceMock", () => {
  test("getList", async () => {
    const number = 10;
    const list = await new PostServiceMock().getList(number);

    expect(list).toHaveLength(number);
  });

  describe("getBySlug", () => {
    test("slugslugslugslug", async () => {
      const post = await new PostServiceMock().getBySlug("slugslugslugslug");

      expect(post).not.toBeNull();
    });

    test("slug", async () => {
      const post = await new PostServiceMock().getBySlug("slug");

      expect(post).toBeNull();
    });
  });
});
