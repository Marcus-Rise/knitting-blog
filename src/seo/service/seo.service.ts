import type { ISeoService } from "./seo.service.interface";
import { inject, injectable } from "inversify";
import type { IPostService } from "../../post";
import { POST_SERVICE_PROVIDER } from "../../post";
import type { ISeoConfigService } from "../config";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../config";
import { format } from "date-fns";

@injectable()
class SeoService implements ISeoService {
  constructor(
    @inject(POST_SERVICE_PROVIDER) private readonly posts: IPostService,
    @inject(SEO_CONFIG_SERVICE_PROVIDER) private readonly config: ISeoConfigService,
  ) {}

  async generateRobotsTxt(hostName: string): Promise<string> {
    const sections: { [p: string]: string } = !this.config.allowRobots
      ? {
          "User-agent": "*",
          Disallow: "/",
          Sitemap: `https://${hostName}/sitemap.xml`,
        }
      : {
          "User-agent": "*",
          Allow: "/",
          Sitemap: `https://${hostName}/sitemap.xml`,
        };

    return Object.keys(sections)
      .map((i) => `${i}: ${sections[i]}`)
      .join("\n");
  }

  async generateSitemap(hostName: string): Promise<string> {
    let buf = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const posts = await this.posts.getList(0);

    posts.forEach((post) => {
      const url = `https://${hostName}/${post.slug}`;
      const lastEditDate = new Date(post.date);
      const dateStr = format(lastEditDate, "yyyy-MM-dd");

      buf += `<url><loc>${url}</loc><lastmod>${dateStr}</lastmod></url>`;
    });

    buf += `</urlset>`;

    return buf.toString();
  }
}

export { SeoService };
