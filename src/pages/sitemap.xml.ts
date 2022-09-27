import type { GetServerSideProps } from "next";
import { PostService } from "../post/post.service";

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const hostName = "https://" + String(req.headers.host);

  const posts = await PostService.list();

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

  const str = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls} 
    </urlset>
  `;

  res.setHeader("Content-Type", "application/xml");
  res.end(str);

  return {
    props: {},
  };
};

const Sitemap = () => {};

export default Sitemap;
export { getServerSideProps };
