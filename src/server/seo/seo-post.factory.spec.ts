import { SeoPostFactory } from "./seo-post.factory";
import { mock } from "jest-mock-extended";
import type { IPostWithoutContent } from "../../common/post";

describe("SeoPostFactory", () => {
  describe("toSitemapRaw", () => {
    it("should escape symbols", () => {
      const { slug, date } = mock<IPostWithoutContent>({
        slug: "коричневый-кардиган",
        date: new Date(2020, 12, 12).toJSON(),
      });
      const item = SeoPostFactory.toSitemapRaw({ slug, date, hostName: "https://test.com" });

      expect(item).not.toContain(slug);
      expect(item).toMatchSnapshot();
    });
  });
});
