import type { MetadataRoute } from "next";
import { getPosts } from "../server";
import { config } from "../config";

type Page = MetadataRoute.Sitemap[number];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [firstPost, ...posts] = await getPosts();

  const mainPage: Page = {
    url: new URL("/", config.baseUrl).href,
    lastModified: firstPost.date,
  };
  const postPages = [firstPost, ...posts].map((post) => ({
    url: new URL(`/${post.slug}`, config.baseUrl).href,
    lastModified: post.date,
  }));

  return [mainPage, ...postPages];
};

export default sitemap;
