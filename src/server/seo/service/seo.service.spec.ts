import "reflect-metadata";
import { SeoService } from "./seo.service";
import { mock } from "jest-mock-extended";
import type { IPostService } from "../../post";
import type { ISeoConfigService } from "../config";
import type { IPost } from "../../../common/post";

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
    const lastDate = new Date(2020, 12, 13);
    const service = new SeoService(
      {
        itemLastDate: lastDate,
        items: [
          mock<IPost>({
            slug: "post2",
            date: lastDate.toJSON(),
          }),
          mock<IPost>({
            slug: "мужскои-жакет-с-воротником-стоикои",
            date: new Date(2020, 12, 12).toJSON(),
          }),
        ],
        async load() {},
      } as unknown as IPostService,
      mock<ISeoConfigService>(),
    );

    const data = await service.generateSitemap("надя-вяжет.рф");

    expect(data.length).toBeGreaterThan(0);
    expect(data).toMatchSnapshot();
  });
});
