import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getPosts } from "../server";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const host = headers().get("Host") ?? "";
  const [firstPost, ...posts] = await getPosts();

  return [
    {
      url: new URL(`https://${host}/`).toString(),
      lastModified: firstPost.date,
    },
    {
      url: new URL(`https://${host}/${firstPost.slug}`).toString(),
      lastModified: firstPost.date,
    },
    ...posts.map((post) => ({
      url: new URL(`https://${host}/${post.slug}`).toString(),
      lastModified: post.date,
    })),
  ];
};

export default sitemap;
