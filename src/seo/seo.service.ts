import type { ISeoService } from "./seo.service.interface";
import { inject, injectable } from "inversify";
import type { IPostService } from "../post";
import { POST_SERVICE_PROVIDER } from "../post";
import type { IAppService } from "../app";
import { APP_SERVICE_PROVIDER } from "../app";

@injectable()
class SeoService implements ISeoService {
  constructor(
    @inject(POST_SERVICE_PROVIDER) private readonly posts: IPostService,
    @inject(APP_SERVICE_PROVIDER) private readonly app: IAppService,
  ) {}

  async generateRobotsTxt(hostName: string): Promise<string> {
    const sections: { [p: string]: string } = !this.app.allowRobots
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
    let buf = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const posts = await this.posts.getList(0);

    posts.forEach((post) => {
      const url = `https://${hostName}/${post.slug}`;
      const period = "daily";
      const priority = 0.9;

      buf += `<url><loc>${url}</loc><changefreq>${period}</changefreq><priority>${priority}</priority></url>`;
    });

    buf += `</urlset>`;

    return buf.toString();
  }
}

export { SeoService };
