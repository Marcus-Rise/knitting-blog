import type { ISeoService } from "./seo.service.interface";
import { inject, injectable } from "inversify";
import type { IPostService } from "../../post";
import { POST_SERVICE_PROVIDER } from "../../post";
import type { ISeoConfigService } from "../config";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../config";
import { SeoPostFactory } from "../seo-post.factory";

@injectable()
class SeoService implements ISeoService {
  constructor(
    @inject(POST_SERVICE_PROVIDER) private readonly _posts: IPostService,
    @inject(SEO_CONFIG_SERVICE_PROVIDER) private readonly _config: ISeoConfigService,
  ) {}

  static getDateStr(lastEditDate: Date): string {
    return lastEditDate.toJSON();
  }

  async generateRobotsTxt(hostName: string): Promise<string> {
    const sections: Record<string, string> = !this._config.allowRobots
      ? {
          "User-agent": "*",
          Disallow: "/",
          Sitemap: `${hostName}/sitemap.xml`,
        }
      : {
          "User-agent": "*",
          Allow: "/",
          Sitemap: `${hostName}/sitemap.xml`,
        };

    return Object.keys(sections)
      .map((i) => `${i}: ${sections[i]}`)
      .join("\n");
  }

  async generateSitemap(hostName: string): Promise<string> {
    await this._posts.load();

    const date = this._posts.itemLastDate;

    let buf = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    if (!!date) {
      buf += SeoPostFactory.toSitemapRaw({ slug: "", date: date.toJSON(), hostName });
    }

    const items = this._posts.items.reduce(
      (raw, { slug, date }) =>
        raw +
        SeoPostFactory.toSitemapRaw({
          slug,
          date,
          hostName,
        }),
      buf,
    );

    return `${items}</urlset>`;
  }
}

export { SeoService };
