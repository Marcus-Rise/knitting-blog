import type { ISeoService } from "./seo.service.interface";
import { inject, injectable } from "inversify";
import type { IPostService } from "../post";
import { POST_SERVICE_PROVIDER } from "../post";
import { SitemapStream, streamToPromise } from "sitemap";

@injectable()
class SeoService implements ISeoService {
  constructor(@inject(POST_SERVICE_PROVIDER) private readonly posts: IPostService) {}

  async generateRobotsTxt(hostName: string): Promise<string> {
    const sections: { [key: string]: string } = {
      "User-agent": "*",
      Disallow: "/",
      Sitemap: `https://${hostName}/sitemap.xml`,
    };

    return Object.keys(sections)
      .map((i) => `${i}: ${sections[i]}`)
      .join("\n");
  }

  async generateSitemap(hostName: string): Promise<string> {
    const smStream = new SitemapStream({
      hostname: `https://${hostName}`,
    });

    const posts = await this.posts.getList(0);

    posts.forEach((post) => {
      smStream.write({
        url: `/${post.slug}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    smStream.end();

    const buffer = await streamToPromise(smStream);

    return buffer.toString();
  }
}

export { SeoService };
