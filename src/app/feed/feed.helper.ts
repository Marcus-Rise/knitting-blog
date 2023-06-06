import { getPosts } from "../../server";
import { config } from "../../config";
import { Feed } from "feed";
import Logo from "../icon.png";

const generateFeed = async (baseUrl: URL) => {
  const [firstPost, ...posts] = await getPosts();
  const title = config.title;
  const description = firstPost.description;

  const chanel = new Feed({
    title,
    description,
    id: baseUrl.href,
    link: baseUrl.href,
    language: "ru",
    image: new URL(Logo.src, baseUrl).href,
    favicon: new URL("/favicon.ico", baseUrl).href,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${config.author.name}`,
    updated: firstPost.date,
    author: config.author,
  });

  for (const post of [firstPost, ...posts]) {
    const postUrl = new URL("/" + post.slug, baseUrl).href;

    chanel.addItem({
      title: post.title,
      description: post.description,
      date: post.date,
      id: postUrl,
      link: postUrl,
      image: post.image.src,
    });
  }

  return chanel;
};

export { generateFeed };
