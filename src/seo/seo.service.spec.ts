import "reflect-metadata";
import { SeoService } from "./seo.service";
import { mock } from "jest-mock-extended";
import type { IPost, IPostService } from "../post";
import type { IAppService } from "../app";

describe("SeoService", () => {
  describe("generateRobotsTxt", () => {
    test("robots are not allowed", async () => {
      const service = new SeoService(
        mock<IPostService>(),
        mock<IAppService>({
          allowRobots: false,
        }),
      );

      const data = await service.generateRobotsTxt("hostname");

      expect(data.length).toBeGreaterThan(0);
      expect(data).toMatchSnapshot();
    });
    test("robots are allowed", async () => {
      const service = new SeoService(
        mock<IPostService>(),
        mock<IAppService>({ allowRobots: true }),
      );

      const data = await service.generateRobotsTxt("hostname");

      expect(data.length).toBeGreaterThan(0);
      expect(data).toMatchSnapshot();
    });
  });

  test("generateSitemap", async () => {
    const service = new SeoService(
      mock<IPostService>({
        getList: () =>
          Promise.resolve([
            mock<IPost>({
              slug: "post1",
            }),
            mock<IPost>({
              slug: "post2",
            }),
          ]),
      }),
      mock<IAppService>(),
    );

    const data = await service.generateSitemap("hostname");

    expect(data.length).toBeGreaterThan(0);
    expect(data).toMatchSnapshot();
  });
});
