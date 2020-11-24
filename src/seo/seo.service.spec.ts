import "reflect-metadata";
import { SeoService } from "./seo.service";
import { mock } from "jest-mock-extended";
import type { IPost, IPostService } from "../post";

describe("SeoService", () => {
  test("generateRobotsTxt", async () => {
    const service = new SeoService(mock<IPostService>());

    const data = await service.generateRobotsTxt("hostname");

    expect(data.length).toBeGreaterThan(0);
    expect(data).toMatchSnapshot();
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
    );

    const data = await service.generateSitemap("hostname");

    expect(data.length).toBeGreaterThan(0);
    expect(data).toMatchSnapshot();
  });
});
