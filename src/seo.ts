import type { PostPreviewModel } from "./post/model";

const getSiteMap = async (posts: PostPreviewModel[], host: string): Promise<string> => {
  const urls = posts.reduce(
    (buffer, post) => {
      const url = new URL(post.slug, host).toString();

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
    <loc>${host}/</loc>
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
};

const getRobotsTxt = (hostName: string, isAllow: boolean): string => {
  const robots: Record<string, string> = isAllow
    ? {
        "User-agent": "*",
        Allow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      }
    : {
        "User-agent": "*",
        Disallow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      };

  return Object.keys(robots)
    .map((i) => `${i}: ${robots[i]}`)
    .join("\n");
};

export { getSiteMap, getRobotsTxt };
