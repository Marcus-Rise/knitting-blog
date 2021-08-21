import "reflect-metadata";
import { SeoService } from "./seo.service";
import { mock } from "jest-mock-extended";
import type { IPost, IPostService } from "../../post";
import type { ISeoConfigService } from "../config";

describe("SeoService", () => {
  describe("generateRobotsTxt", () => {
    test("robots are not allowed", async () => {
      const service = new SeoService(
        mock<IPostService>(),
        mock<ISeoConfigService>({
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
        mock<ISeoConfigService>({ allowRobots: true }),
      );

      const data = await service.generateRobotsTxt("hostname");

      expect(data.length).toBeGreaterThan(0);
      expect(data).toMatchSnapshot();
    });
  });

  test("generateSitemap", async () => {
    const service = new SeoService(
      mock<IPostService>({
        items: [
          mock<IPost>({
            slug: "post1",
            date: new Date(2020, 12, 12).toJSON(),
          }),
          mock<IPost>({
            slug: "post2",
            date: new Date(2020, 12, 13).toJSON(),
          }),
        ],
      }),
      mock<ISeoConfigService>(),
    );

    const data = await service.generateSitemap("hostname");

    expect(data.length).toBeGreaterThan(0);
    expect(data).toMatchSnapshot();
  });
});
