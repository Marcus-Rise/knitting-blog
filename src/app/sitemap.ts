import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import type { IPostService } from "../server";
import { inject, POST_SERVICE } from "../server";

const getPosts = () =>
  inject((postService: IPostService) => postService.getAll(true), [POST_SERVICE]);

export default async (): Promise<MetadataRoute.Sitemap> => {
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
