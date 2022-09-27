import type { GetServerSideProps } from "next";
import { PostService } from "../post/post.service";

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const hostName = "https://" + String(req.headers.host);

  const posts = await PostService.getList();

  const urls = posts.reduce((buffer, post) => {
    const url = new URL(post.slug, hostName).toString();
    return (
      buffer +
      `<url>
          <loc>${url}</loc>
          <lastmod>${post.date}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
    `
    );
  }, "");

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
