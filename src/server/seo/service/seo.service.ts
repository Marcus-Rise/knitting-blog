import type { ISeoService } from "./seo-service.interface";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "../../post/repository";
import { POST_REPOSITORY } from "../../post/repository";

@injectable()
class SeoService implements ISeoService {
  constructor(@inject(POST_REPOSITORY) private readonly _postsRepo: IPostRepository) {}

  async generateSitemapXml(hostName: string): Promise<string> {
    const posts = await this._postsRepo.list();

    const urls = posts.reduce(
      (buffer, post) => {
        const url = new URL(post.slug, hostName).toString();

        return (
          buffer +
          `<url>
          <loc>${url}</loc>
          <lastmod>${post.date}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
        </url>
    `
        );
      },
      `
  <url>
    <loc>${hostName}/</loc>
    <lastmod>${posts.at(0)?.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
`,
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls} 
    </urlset>
  `;
  }
}

export { SeoService };
