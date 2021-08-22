import type { ISeoService } from "./seo.service.interface";
import { inject, injectable } from "inversify";
import type { IPostService } from "../../post";
import { POST_SERVICE_PROVIDER } from "../../post";
import type { ISeoConfigService } from "../config";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../config";

@injectable()
class SeoService implements ISeoService {
  constructor(
    @inject(POST_SERVICE_PROVIDER) private readonly posts: IPostService,
    @inject(SEO_CONFIG_SERVICE_PROVIDER) private readonly config: ISeoConfigService,
  ) {}

  static getDateStr(lastEditDate: Date): string {
    return lastEditDate.toJSON();
  }

  static getUrlStr(url: string): string {
    return encodeURIComponent(url);
  }

  async generateRobotsTxt(hostName: string): Promise<string> {
    const sections: Record<string, string> = !this.config.allowRobots
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
    let buf = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    await this.posts.load(0);

    const date = this.posts.itemLastDate;
    const url = SeoService.getUrlStr(`${hostName}/`);

    if (!!date) {
      buf += `<url>
    <loc>${url}</loc>
    <lastmod>${SeoService.getDateStr(date)}</lastmod>
    </url>`;
    }

    this.posts.items.forEach((post) => {
      const url = SeoService.getUrlStr(`${hostName}/${post.slug}/`);
      const lastEditDate = new Date(post.date);
      const dateStr = SeoService.getDateStr(lastEditDate);

      buf += `<url>
      <loc>${url}</loc>
      <lastmod>${dateStr}</lastmod>
      </url>`;
    });

    buf += `</urlset>`;

    return buf.toString();
  }
}

export { SeoService };
