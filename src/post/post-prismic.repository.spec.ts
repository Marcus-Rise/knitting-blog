import "reflect-metadata";
import { PostPrismicRepository } from "./post-prismic.repository";
import { mock } from "jest-mock-extended";
import type { IPrismicService } from "../prismic";
import type ApiSearchResponse from "prismic-javascript/types/ApiSearchResponse";
import type { IPostPrismicDto } from "./post-prismic.dto.interface";

describe("PostPrismicRepository", () => {
  describe("find", () => {
    test("not exist", async () => {
      const repo = new PostPrismicRepository(
        mock<IPrismicService>({
          client: {
            getByUID: () => Promise.resolve((undefined as unknown) as IPostPrismicDto),
          },
        }),
      );
      const slug = "slug";
      const item = await repo.find({ slug });

      expect(item).toBeNull();
    });

    test("exist", async () => {
      const slug = "slug0";
      const repo = new PostPrismicRepository(
        mock<IPrismicService>({
          client: {
            getByUID: () =>
              Promise.resolve(
                mock<IPostPrismicDto>({
                  uid: slug,
                  slugs: [slug],
                }),
              ),
          },
        }),
      );
      const item = await repo.find({ slug });

      expect(item).not.toBeNull();
    });
  });

  describe("list", () => {
    test("empty", async () => {
      const repo = new PostPrismicRepository(
        mock<IPrismicService>({
          client: {
            query: () =>
              Promise.resolve(
                mock<ApiSearchResponse>({
                  results: [],
                }),
              ),
          },
        }),
      );
      const items = await repo.list();

      expect(items).toHaveLength(0);
    });

    test("criteria slug", async () => {
      const slug = "slug3";
      const repo = new PostPrismicRepository(
        mock<IPrismicService>({
          client: {
            query: () =>
              Promise.resolve(
                mock<ApiSearchResponse>({
                  results: [
                    mock<IPostPrismicDto>({
                      uid: slug,
                      slugs: [slug],
                    }),
                  ],
                }),
              ),
          },
        }),
      );
      const items = await repo.list({ slug: slug });

      expect(items).toHaveLength(1);
    });
  });
});
