import { PostServiceMock } from "./post.service.mock";

describe("PostServiceMock", () => {
  test("getList", async () => {
    const list = await new PostServiceMock().getList();

    expect(list).toHaveLength(3);
  });
});
