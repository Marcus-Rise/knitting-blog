import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getPosts } from "../server";

type Page = MetadataRoute.Sitemap[number];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const host = headers().get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);

  const [firstPost, ...posts] = await getPosts();

  const mainPage: Page = {
    url: new URL("/", baseUrl).href,
    lastModified: firstPost.date,
  };
  const postPages = [firstPost, ...posts].map((post) => ({
    url: new URL(`/${post.slug}`, baseUrl).href,
    lastModified: post.date,
  }));

  return [mainPage, ...postPages];
};

export default sitemap;
