import "reflect-metadata";
import { PostService } from "./post.service";
import { mock } from "jest-mock-extended";
import type { IPostRepository } from "../repository";
import type { IPost } from "../../../common/post/post.interface";

describe("PostService", () => {
  describe("getBySlug", () => {
    test("exist", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          find: () => Promise.resolve(mock<IPost>({ slug })),
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

  describe("getPreview", () => {
    test("exist", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          find: () => Promise.resolve(mock<IPost>()),
        }),
      );
      const item = await postService.getPreview("id");

      expect(item).not.toBeNull();
    });

    test("not exist", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          find: () => Promise.resolve(null),
        }),
      );
      const item = await postService.getPreview("id");

      expect(item).toBeNull();
    });
  });

  describe("load", () => {
    test("empty", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          list: () => Promise.resolve([]),
        }),
      );

      await postService.load(0, 10);

      expect(postService.items).toHaveLength(0);
    });

    test("not empty", async () => {
      const postService = new PostService(
        mock<IPostRepository>({
          list: () => Promise.resolve(new Array(5).fill(mock<IPost>())),
        }),
      );

      await postService.load(0, 10);

      expect(postService.items).toHaveLength(5);
    });
  });

  describe("itemLastDate", () => {
    it("should get the last date from post array", async () => {
      const date = new Date(2020, 11, 12).toJSON();
      const service = new PostService(
        mock<IPostRepository>({
          async list(): Promise<IPost[]> {
            return [
              mock<IPost>({ date: new Date(2020, 5, 12).toJSON() }),
              mock<IPost>({
                date,
              }),
              mock<IPost>({ date: new Date(2020, 2, 12).toJSON() }),
              mock<IPost>({ date: new Date(2020, 7, 12).toJSON() }),
            ];
          },
        }),
      );

      await service.load(0);

      expect(service.itemLastDate?.toJSON()).toBe(date);
    });
  });
});
