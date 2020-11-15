import "reflect-metadata";
import { PostService } from "./post.service";
import { mock } from "jest-mock-extended";
import type { IPostRepository } from "./post.repository.interface";
import type { IPost } from "./post.interface";

describe("PostService", () => {
  describe("getBySlug", () => {
    test("exist", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          find: () =>
            Promise.resolve(
              mock<IPost>({ slug }),
            ),
        }),
      );
      const slug = "slug";
      const item = await postService.getBySlug(slug);

      expect(item).not.toBeNull();
      expect(item?.slug).toEqual(slug);
    });

    test("not exist", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          find: () => Promise.resolve(null),
        }),
      );
      const slug = "slug";
      const item = await postService.getBySlug(slug);

      expect(item).toBeNull();
    });
  });

  describe("getList", () => {
    test("empty", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          list: () => Promise.resolve([]),
        }),
      );

      const items = await postService.getList(0, 10);

      expect(items).toHaveLength(0);
    });

    test("not empty", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          list: () => Promise.resolve(new Array(5).fill(mock<IPost>())),
        }),
      );

      const items = await postService.getList(0, 10);

      expect(items).toHaveLength(5);
    });
  });
});
