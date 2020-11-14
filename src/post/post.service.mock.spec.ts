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
      const service = new PostServiceMock();
      const slug = "slugslugslugslug";
      const post = await service.getBySlug(slug);

      expect(post).not.toBeNull();
    });
  });
});
